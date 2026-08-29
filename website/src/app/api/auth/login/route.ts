import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, role, name, phone } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'L\'email est requis.' }, { status: 400 });
    }

    let user = await db.user.findUnique({
      where: { email },
      include: { addresses: true }
    });

    if (!user) {
      // Determine real name and phone
      const displayName = name || (email.toLowerCase().includes('amani') ? 'moussaoui amani' : email.split('@')[0]);
      const displayPhone = phone || '+216 27 500 246';

      user = await db.user.create({
        data: {
          name: displayName,
          email,
          phone: displayPhone,
          role: role || 'customer',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          addresses: {
            create: {
              title: 'Résidence Principale',
              street: '1 rue Jean de Dormans',
              city: 'Dormans',
              zipCode: '51700',
              phone: displayPhone,
              isDefault: true
            }
          }
        },
        include: { addresses: true }
      });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error('API Error /api/auth/login:', error);
    return NextResponse.json(
      { error: 'Échec de la connexion PostgreSQL' },
      { status: 500 }
    );
  }
}
