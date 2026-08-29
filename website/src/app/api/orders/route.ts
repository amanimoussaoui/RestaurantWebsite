import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('API Error /api/orders GET:', error);
    return NextResponse.json({ error: 'Failed to fetch orders from PostgreSQL' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newOrder = await db.order.create({
      data: {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        userEmail: body.userEmail || 'client@lecrispy.fr',
        userName: body.userName || 'Client Le Crispy',
        userPhone: body.userPhone || '+33 6 12 34 56 78',
        serviceMode: body.serviceMode || 'sur_place',
        tableNumber: body.tableNumber || null,
        deliveryAddress: body.deliveryAddress ? JSON.parse(JSON.stringify(body.deliveryAddress)) : null,
        items: JSON.parse(JSON.stringify(body.items || [])),
        subtotal: parseFloat(body.subtotal),
        deliveryFee: parseFloat(body.deliveryFee || 0),
        total: parseFloat(body.total),
        status: body.status || 'pending',
        paymentMethod: body.paymentMethod || 'stripe',
        paymentStatus: body.paymentStatus || 'paid',
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('API Error /api/orders POST:', error);
    return NextResponse.json({ error: 'Failed to create order in PostgreSQL' }, { status: 500 });
  }
}
