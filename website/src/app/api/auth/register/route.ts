import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, phone, role, password } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Le nom et l\'email sont requis.' }, { status: 400 });
    }

    // Check if user already exists in PostgreSQL
    const existingUser = await db.user.findUnique({
      where: { email },
      include: { addresses: true }
    });

    if (existingUser) {
      return NextResponse.json(existingUser, { status: 200 });
    }

    // Insert new user into PostgreSQL users table
    const newUser = await db.user.create({
      data: {
        name,
        email,
        phone: phone || '+216 98 765 432',
        role: role || 'customer',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        addresses: {
          create: {
            title: 'Résidence Principale',
            street: 'Les Berges du Lac 2',
            city: 'Tunis',
            zipCode: '1053',
            phone: phone || '+216 98 765 432',
            isDefault: true
          }
        }
      },
      include: {
        addresses: true
      }
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error('API Error /api/auth/register:', error);
    return NextResponse.json(
      { error: 'Échec de l\'enregistrement de l\'utilisateur dans PostgreSQL' },
      { status: 500 }
    );
  }
}
