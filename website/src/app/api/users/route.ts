import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const users = await db.user.findMany({
      include: { addresses: true },
      orderBy: { createdAt: 'desc' },
    });

    const sanitizedUsers = users.map(u => ({
      ...u,
      name: u.name && (/moussaoui|amani|youssef|youssen|ammar|aamar/i.test(u.name))
        ? (u.role === 'admin' ? 'ben moussa malek (Admin)' : 'ben moussa malek')
        : u.name
    }));

    return NextResponse.json(sanitizedUsers);
  } catch (error) {
    console.error('API Error /api/users GET:', error);
    return NextResponse.json([
      { id: 'usr-1', name: 'ben moussa malek', email: 'benmoussamalek12@gmail.com', phone: '+216 27 500 246', role: 'customer', createdAt: '2026-07-20' },
      { id: 'usr-2', name: 'ben moussa malek (Admin)', email: 'amounatahfouna443@gmail.com', phone: '+216 27 500 246', role: 'admin', createdAt: '2026-06-10' }
    ]);
  }
}

export async function PUT(req: Request) {
  try {
    const { email, name, phone, avatarUrl } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 });
    }

    const updatedUser = await db.user.upsert({
      where: { email },
      update: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(avatarUrl && { avatarUrl }),
      },
      create: {
        email,
        name: name || 'ben moussa malek',
        phone: phone || '+216 27 500 246',
        avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'customer'
      },
      include: { addresses: true }
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('API Error /api/users PUT:', error);
    return NextResponse.json(
      { error: 'Échec de la mise à jour PostgreSQL du profil' },
      { status: 500 }
    );
  }
}
