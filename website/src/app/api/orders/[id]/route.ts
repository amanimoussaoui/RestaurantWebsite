import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const updatedOrder = await db.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('API Error /api/orders/[id] PATCH:', error);
    return NextResponse.json({ error: 'Failed to update order status in PostgreSQL' }, { status: 500 });
  }
}
