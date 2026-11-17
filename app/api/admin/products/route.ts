import { NextRequest, NextResponse } from 'next/server';
import { readServerProducts, writeServerProducts } from '@/lib/serverStore';
import type { Product } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = readServerProducts();
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

    const products = readServerProducts();
    const newId =
      body.id ||
      body.slug ||
      body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') ||
      `prod-${Date.now()}`;

    const newProduct: Product = {
      ...body,
      id: newId,
      slug: body.slug || newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const existingIdx = products.findIndex((p) => p.id === newId);
    if (existingIdx !== -1) {
      products[existingIdx] = newProduct;
    } else {
      products.unshift(newProduct);
    }

    writeServerProducts(products);
    return NextResponse.json({ success: true, id: newId, product: newProduct });
  } catch (err: any) {
    console.error('Error in createProduct API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to create product' }, { status: 500 });
  }
}
