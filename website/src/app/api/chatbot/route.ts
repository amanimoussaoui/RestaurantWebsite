import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { MOCK_MENU } from '@/data/mockData';
import axios from 'axios';

function getItemName(item: any): string {
  if (!item) return 'Plat Le Crispy';
  if (typeof item.name === 'string') return item.name;
  if (item.name && typeof item.name === 'object') {
    return item.name.fr || item.name.en || item.name.ar || Object.values(item.name)[0] || 'Plat Le Crispy';
  }
  return item.nameFr || item.name_fr || 'Plat Le Crispy';
}

function getItemDesc(item: any): string {
  if (!item) return '';
  if (typeof item.description === 'string') return item.description;
  if (item.description && typeof item.description === 'object') {
    return item.description.fr || item.description.en || item.description.ar || Object.values(item.description)[0] || '';
  }
  return item.descFr || item.description_fr || '';
}

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json();
    const userPrompt = (message || '').toString().toLowerCase();

    // 1. Récupération des plats (Prisma DB ou Mock Data)
    let menuItems: any[] = [];
    try {
      menuItems = await db.menuItem.findMany();
    } catch {
      menuItems = MOCK_MENU;
    }

    if (!menuItems || menuItems.length === 0) {
      menuItems = MOCK_MENU;
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.trim() : '';

    // 2. Si la clé OpenRouter est disponible, appeler l'API OpenRouter
    if (openRouterApiKey && !openRouterApiKey.includes('YOUR_OPENROUTER_KEY_HERE')) {
      const menuContextString = menuItems
        .map(
          (i: any) =>
            `- [${i.id}] ${getItemName(i)} (${i.price}€): ${getItemDesc(i)} | Calories: ${i.nutrition?.calories || i.calories || 'N/A'}kcal, Protéines: ${i.nutrition?.protein || i.protein || 'N/A'}g, Épicé: ${i.spiceLevel || 0}/3, Healthy: ${i.isHealthy}`
        )
        .join('\n');

      const systemPrompt = `Tu es le Chef IA Concierge du restaurant fast-food haut de gamme "Le Crispy".
Ton rôle est de recommander des plats, conseiller les clients selon leurs envies (calories, protéines, budget, épicé), et répondre aimablement.

Voici la liste exacte des plats actuellement disponibles dans notre carte :
${menuContextString}

Instructions :
1. Réponds poliment dans la langue du client (Français, Arabe ou Anglais).
2. Recommande 1 à 3 plats précis de notre carte en citant leurs noms et prix.
3. Sois chaleureux, élégant et gourmand.`;

      // Modèles OpenRouter avec fallback
      const modelsToTry = [
        'openrouter/auto',
        'google/gemini-2.0-flash-lite-001',
        'openai/gpt-4o-mini',
        'meta-llama/llama-3.3-70b-instruct:free'
      ];

      for (const modelName of modelsToTry) {
        try {
          const openRouterResponse = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
              model: modelName,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `L'utilisateur demande (langue ${language || 'fr'}) : "${message}"` }
              ],
              temperature: 0.7,
              max_tokens: 350
            },
            {
              headers: {
                'Authorization': `Bearer ${openRouterApiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4242',
                'X-Title': 'Le Crispy Restaurant'
              },
              timeout: 10000
            }
          );

          const botReply = openRouterResponse.data?.choices?.[0]?.message?.content;
          if (botReply) {
            // Identifier les plats mentionnés pour les afficher en widgets
            const matchedProducts = menuItems.filter((i: any) => {
              const name = getItemName(i).toLowerCase();
              return botReply.toLowerCase().includes(name) || botReply.includes(i.id);
            });

            return NextResponse.json({
              reply: botReply,
              products: matchedProducts.length > 0 ? matchedProducts.slice(0, 3) : menuItems.slice(0, 3)
            });
          }
        } catch (modelErr: any) {
          console.warn(`Modèle OpenRouter ${modelName} indisponible:`, modelErr?.response?.data || modelErr.message);
        }
      }
    }

    // 3. Fallback Moteur IA Local Réactif
    let replyText = "Bonjour ! Je suis votre Chef Concierge IA Le Crispy. Voici mes meilleures recommandations culinaires :";
    let recommendedProducts: any[] = menuItems.slice(0, 3);

    if (userPrompt.includes('healthy') || userPrompt.includes('calori') || userPrompt.includes('fit') || userPrompt.includes('sport') || userPrompt.includes('protéin')) {
      replyText = "Excellente initiative ! Voici notre sélection de plats Healthy & Fit riches en protéines :";
      recommendedProducts = menuItems.filter((i: any) => i.isHealthy || (i.nutrition?.protein || i.protein || 0) > 30);
      if (recommendedProducts.length === 0) recommendedProducts = menuItems.slice(0, 2);
    } else if (userPrompt.includes('burger') || userPrompt.includes('viande') || userPrompt.includes('croustillant')) {
      replyText = "Nos Burgers Gourmet sont la grande spécialité de la maison ! Préparés à la commande :";
      recommendedProducts = menuItems.filter((i: any) => (i.category || '').toLowerCase() === 'burgers' || getItemName(i).toLowerCase().includes('burger'));
      if (recommendedProducts.length === 0) recommendedProducts = menuItems.slice(0, 2);
    } else if (userPrompt.includes('épicé') || userPrompt.includes('piquant') || userPrompt.includes('sauce')) {
      replyText = "Découvrez nos spécialités épicées avec nos sauces maison :";
      recommendedProducts = menuItems.filter((i: any) => (i.spiceLevel || 0) > 0);
      if (recommendedProducts.length === 0) recommendedProducts = menuItems.slice(0, 2);
    } else if (userPrompt.includes('hi') || userPrompt.includes('hello') || userPrompt.includes('bonjour') || userPrompt.includes('salut')) {
      replyText = "Bonjour et bienvenue chez Le Crispy ! Je suis votre Chef Concierge. Que désirez-vous déguster aujourd hui ?";
      recommendedProducts = menuItems.slice(0, 3);
    }

    return NextResponse.json({
      reply: replyText,
      products: recommendedProducts.slice(0, 3)
    });

  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json({
      reply: "Bonjour ! Je suis votre Chef Concierge Le Crispy. Comment puis-je vous régaler aujourd hui ?",
      products: MOCK_MENU.slice(0, 2)
    });
  }
}
