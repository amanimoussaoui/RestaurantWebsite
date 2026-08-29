import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const reclamations = await db.reclamation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(reclamations);
  } catch (error) {
    console.error('API Error /api/reclamations GET:', error);
    return NextResponse.json({ error: 'Failed to fetch reclamations from PostgreSQL' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newClaim = await db.reclamation.create({
      data: {
        orderId: body.orderId || 'ORD-0000',
        userName: body.userName || 'Client',
        userEmail: body.userEmail,
        userPhone: body.userPhone || '+33 6 00 00 00 00',
        subject: body.subject || 'Problème Commande',
        description: body.description,
        status: 'new',
      },
    });

    return NextResponse.json(newClaim, { status: 201 });
  } catch (error) {
    console.error('API Error /api/reclamations POST:', error);
    return NextResponse.json({ error: 'Failed to submit claim in PostgreSQL' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, adminNote } = await req.json();

    const updated = await db.reclamation.update({
      where: { id },
      data: {
        status: status || undefined,
        adminNote: adminNote || undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('API Error /api/reclamations PATCH:', error);
    return NextResponse.json({ error: 'Failed to update claim resolution' }, { status: 500 });
  }
}
