import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await db.menuItem.update({
      where: { id },
      data: {
        nameFr: body.nameFr || body.name?.fr,
        nameAr: body.nameAr || body.name?.ar,
        nameEn: body.nameEn || body.name?.en,
        price: body.price ? parseFloat(body.price) : undefined,
        category: body.category,
        image: body.image,
        spiceLevel: body.spiceLevel,
        isHealthy: body.isHealthy,
        calories: body.calories || body.nutrition?.calories,
        protein: body.protein || body.nutrition?.protein,
        carbs: body.carbs || body.nutrition?.carbs,
        fat: body.fat || body.nutrition?.fat,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('API Error /api/menu/[id] PUT:', error);
    return NextResponse.json({ error: 'Failed to update menu item in PostgreSQL' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await db.menuItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Item deleted from PostgreSQL' });
  } catch (error) {
    console.error('API Error /api/menu/[id] DELETE:', error);
    return NextResponse.json({ error: 'Failed to delete menu item from PostgreSQL' }, { status: 500 });
  }
}
