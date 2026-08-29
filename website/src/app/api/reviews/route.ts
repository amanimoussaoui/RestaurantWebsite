import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { MOCK_REVIEWS } from '@/data/mockData';

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('API Error /api/reviews GET (Using Mock Fallback):', error);
    return NextResponse.json(MOCK_REVIEWS);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newReview = await db.review.create({
      data: {
        userName: body.userName || 'Client Privilège',
        userAvatar: body.userAvatar || null,
        rating: parseInt(body.rating) || 5,
        comment: body.comment,
        isApproved: true,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('API Error /api/reviews POST:', error);
    return NextResponse.json({ error: 'Failed to create review in PostgreSQL' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, isApproved, reply } = await req.json();

    const updated = await db.review.update({
      where: { id },
      data: {
        isApproved: isApproved !== undefined ? isApproved : undefined,
        reply: reply !== undefined ? reply : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('API Error /api/reviews PATCH:', error);
    return NextResponse.json({ error: 'Failed to update review moderation' }, { status: 500 });
  }
}
