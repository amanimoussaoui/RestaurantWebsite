'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Search, Check, Sparkles, AlertCircle } from 'lucide-react';

interface GoogleMapPickerProps {
  initialAddress?: string;
  onSelectLocation: (location: { address: string; lat: number; lng: number }) => void;
}

export default function GoogleMapPicker({ initialAddress = '', onSelectLocation }: GoogleMapPickerProps) {
  // Default coordinates centered on Le Crispy Dormans (1 rue Jean de Dormans, 51700 Dormans: 49.0762, 3.6375)
  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number }>({ lat: 49.0762, lng: 3.6375 });
  const [searchQuery, setSearchQuery] = useState(initialAddress || '1 rue Jean de Dormans, 51700 Dormans');
  const [selectedAddress, setSelectedAddress] = useState(initialAddress || '1 rue Jean de Dormans, 51700 Dormans');
  const [isLocating, setIsLocating] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Predefined popular delivery zones around Dormans & Marne valley
  const PRESET_ZONES = [
    { label: 'Dormans Centre (51700)', address: '1 rue Jean de Dormans, 51700 Dormans', lat: 49.0762, lng: 3.6375 },
    { label: 'Gare de Dormans (51700)', address: 'Place de la Gare, 51700 Dormans', lat: 49.0740, lng: 3.6420 },
    { label: 'Verneuil (51700)', address: 'Rue Principale, 51700 Verneuil', lat: 49.0910, lng: 3.6720 },
    { label: 'Troissy (51700)', address: 'Route de Reims, 51700 Troissy', lat: 49.0830, lng: 3.7080 },
    { label: 'Vincelles (51700)', address: 'Rue de la Marne, 51700 Vincelles', lat: 49.0950, lng: 3.6410 }
  ];

  // Leaflet map container ref
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerInstanceRef = useRef<any>(null);

  // Initialize Leaflet Map dynamically
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Load Leaflet CSS dynamically
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      if (!mapContainerRef.current || mapInstanceRef.current) return;
      const L = (window as any).L;
      if (!L) return;

      const map = L.map(mapContainerRef.current).setView([markerPos.lat, markerPos.lng], 15);
      mapInstanceRef.current = map;

      // Dark luxury tile layer (OpenStreetMap / CartoDB Dark Matter)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19
      }).addTo(map);

      // Custom Gold Pin Marker
      const goldIcon = L.divIcon({
        className: 'custom-gold-marker',
        html: `<div style="background-color: #c9a24a; width: 32px; height: 32px; border-radius: 50%; border: 3px solid #0d1f14; box-shadow: 0 0 20px rgba(201,162,74,0.8); display: flex; items-center; justify-content: center; transform: translate(-50%, -50%);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0d1f14" stroke="#0d1f14" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
               </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([markerPos.lat, markerPos.lng], {
        draggable: true,
        icon: goldIcon
      }).addTo(map);
      markerInstanceRef.current = marker;

      // Handle map click to move marker
      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        setMarkerPos({ lat, lng });
        marker.setLatLng([lat, lng]);
        reverseGeocode(lat, lng);
      });

      // Handle marker drag
      marker.on('dragend', () => {
        const position = marker.getLatLng();
        setMarkerPos({ lat: position.lat, lng: position.lng });
        reverseGeocode(position.lat, position.lng);
      });
    };

    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Reverse Geocoding using OpenStreetMap Nominatim API
  const reverseGeocode = async (lat: number, lng: number) => {
    setIsGeocoding(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await res.json();
      if (data && data.display_name) {
        setSelectedAddress(data.display_name);
        setSearchQuery(data.display_name);
        onSelectLocation({ address: data.display_name, lat, lng });
      }
    } catch {
      const fallback = `Point GPS (${lat.toFixed(4)}, ${lng.toFixed(4)}) - Dormans 51700`;
      setSelectedAddress(fallback);
      onSelectLocation({ address: fallback, lat, lng });
    } finally {
      setIsGeocoding(false);
    }
  };

  // Search Address Geocoding
  const handleSearchAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsGeocoding(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const first = data[0];
        const lat = parseFloat(first.lat);
        const lng = parseFloat(first.lon);
        setMarkerPos({ lat, lng });
        setSelectedAddress(first.display_name);
        if (mapInstanceRef.current && markerInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lng], 16);
          markerInstanceRef.current.setLatLng([lat, lng]);
        }
        setIsConfirmed(true);
        onSelectLocation({ address: first.display_name, lat, lng });
      }
    } catch {
      // Fallback
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleSelectZone = (zone: typeof PRESET_ZONES[0]) => {
    setMarkerPos({ lat: zone.lat, lng: zone.lng });
    setSelectedAddress(zone.address);
    setSearchQuery(zone.address);
    if (mapInstanceRef.current && markerInstanceRef.current) {
      mapInstanceRef.current.setView([zone.lat, zone.lng], 16);
      markerInstanceRef.current.setLatLng([zone.lat, zone.lng]);
    }
    setIsConfirmed(true);
    onSelectLocation({ address: zone.address, lat: zone.lat, lng: zone.lng });
  };

  const handleGeolocateMe = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPos({ lat: latitude, lng: longitude });
          if (mapInstanceRef.current && markerInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 16);
            markerInstanceRef.current.setLatLng([latitude, longitude]);
          }
          reverseGeocode(latitude, longitude);
          setIsLocating(false);
        },
        () => {
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  return (
    <div className="space-y-4 text-xs select-none">
      
      {/* Location Search Form */}
      <form onSubmit={handleSearchAddress} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[var(--accent-gold)] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une rue, un quartier à Dormans (51700)..."
            className="w-full bg-[var(--bg-primary)] border border-[var(--border-gold)] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[var(--accent-gold)]"
          />
        </div>
        <button
          type="submit"
          disabled={isGeocoding}
          className="btn-gold px-4 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1"
        >
          <span>{isGeocoding ? "Recherche..." : "Chercher"}</span>
        </button>
        <button
          type="button"
          onClick={handleGeolocateMe}
          disabled={isLocating}
          className="btn-gold-outline px-3 py-2 rounded-xl flex items-center gap-1 shrink-0"
          title="Détecter ma position GPS"
        >
          <Navigation className={`w-4 h-4 text-[var(--accent-gold)] ${isLocating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">GPS</span>
        </button>
      </form>

      {/* REAL Interactive Leaflet OpenStreetMap Container */}
      <div className="relative h-64 w-full rounded-2xl overflow-hidden border-2 border-[var(--accent-gold)] bg-stone-950 shadow-2xl z-0">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Address Bar */}
        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/90 border border-[var(--border-gold)] text-xs flex items-center justify-between z-[1000] backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0 animate-bounce" />
            <div>
              <span className="text-[10px] text-[var(--accent-gold)] font-bold block uppercase tracking-wider">Adresse Sélectionnée</span>
              <span className="text-white font-bold truncate block text-xs">{selectedAddress}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsConfirmed(true);
              onSelectLocation({ address: selectedAddress, lat: markerPos.lat, lng: markerPos.lng });
            }}
            className="btn-gold px-3.5 py-1.5 rounded-lg text-xs font-extrabold shrink-0 flex items-center gap-1 shadow-md"
          >
            <Check className="w-4 h-4" />
            <span>Valider l'Adresse</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Zones around Dormans */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider block">
          📍 Suggérer une adresse à Dormans (51700) :
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_ZONES.map((zone, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectZone(zone)}
              className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-gold)] text-[10px] text-white hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors flex items-center gap-1 font-bold"
            >
              <MapPin className="w-3 h-3 text-[var(--accent-gold)]" />
              <span>{zone.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
