import { NextRequest, NextResponse } from 'next/server';
import { readServerProducts, writeServerProducts } from '@/lib/serverStore';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const products = readServerProducts();
    const product = products.find((p) => p.id === params.id || p.slug === params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const body = await req.json();
    const products = readServerProducts();
    const idx = products.findIndex((p) => p.id === params.id || p.slug === params.id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    products[idx] = {
      ...products[idx],
      ...body,
      id: products[idx].id,
      updatedAt: new Date().toISOString(),
    };
    writeServerProducts(products);
    return NextResponse.json({ success: true, product: products[idx] });
  } catch (err: any) {
    console.error('Error in updateProduct API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const products = readServerProducts().filter(
      (p) => p.id !== params.id && p.slug !== params.id
    );
    writeServerProducts(products);
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (err: any) {
    console.error('Error in deleteProduct API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to delete product' }, { status: 500 });
  }
}
