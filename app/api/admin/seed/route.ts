import { NextResponse } from 'next/server';
import { seedInitialDataToFirestore } from '@/lib/firestore';

export async function POST() {
  try {
    const res = await seedInitialDataToFirestore();
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${res.categories} categories and ${res.products} products to Firestore!`,
      ...res,
    });
  } catch (err: any) {
    console.error('Error seeding Firestore:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to seed Firestore' },
      { status: 500 }
    );
  }
}
