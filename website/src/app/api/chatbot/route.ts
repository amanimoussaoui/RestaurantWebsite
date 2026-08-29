import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json();

    // Fetch active menu items from PostgreSQL database for AI context
    const dbItems = await db.menuItem.findMany();

    const menuContextString = dbItems
      .map(
        i =>
          `- [${i.id}] ${i.nameFr} (${i.price}€): ${i.descFr} | Calories: ${i.calories || 'N/A'}kcal, Protéines: ${i.protein || 'N/A'}g, Épicé: ${i.spiceLevel}/3, Healthy: ${i.isHealthy}`
      )
      .join('\n');

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return NextResponse.json(
        { reply: "Désolé, la clé d'API OpenRouter n'est pas configurée dans le fichier .env." },
        { status: 500 }
      );
    }

    const systemPrompt = `Tu es le Chef IA Concierge du restaurant fast-food haut de gamme "Le Crispy".
Ton rôle est de recommander des plats, conseiller les clients selon leurs envies (calories, protéines, budget, épicé), et répondre aimablement.

Voici la liste exacte des plats actuellement disponibles dans notre base de données PostgreSQL "leCrispy" :
${menuContextString}

Instructions :
1. Réponds poliment dans la langue du client (Français, Arabe ou Anglais).
2. Si le client cherche un plat spécifique ou diététique, recommande 1 à 3 plats précis de notre carte en citant leurs noms et prix.
3. Sois chaleureux, élégant et gourmand dans tes explications.`;

    const openRouterResponse = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3.5-sonnet', // or 'openai/gpt-4o-mini'
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 400
      },
      {
        headers: {
          'Authorization': `Bearer ${openRouterApiKey}`,
          'HTTP-Referer': process.env.CLIENT_URL || 'http://localhost:4242',
          'X-Title': 'Le Crispy Restaurant AI Concierge',
          'Content-Type': 'application/json'
        }
      }
    );

    const botReply = openRouterResponse.data?.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu analyser votre demande.";

    return NextResponse.json({ reply: botReply, products: dbItems.slice(0, 3) });
  } catch (error: any) {
    console.error('OpenRouter Chatbot API Error:', error?.response?.data || error.message);
    return NextResponse.json(
      {
        reply: "Bonjour ! Je suis votre Concierge Le Crispy. Nos serveurs mettent à jour les recommandations en direct.",
        error: error.message
      },
      { status: 200 }
    );
  }
}
