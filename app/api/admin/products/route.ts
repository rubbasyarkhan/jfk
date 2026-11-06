import { NextRequest, NextResponse } from 'next/server';
import { createProduct, getAllProducts } from '@/lib/firestore';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ success: true, products });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.category) {
      return NextResponse.json({ error: 'Name and Category are required' }, { status: 400 });
    }

    const id = await createProduct(body);
    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    console.error('Error in createProduct API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to create product' }, { status: 500 });
  }
}
