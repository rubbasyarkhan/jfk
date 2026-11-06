import { NextRequest, NextResponse } from 'next/server';
import { updateProduct, deleteProduct, getProductById } from '@/lib/firestore';

interface Props {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const product = await getProductById(params.id);
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
    await updateProduct(params.id, body);
    return NextResponse.json({ success: true, message: 'Product updated successfully' });
  } catch (err: any) {
    console.error('Error in updateProduct API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    await deleteProduct(params.id);
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (err: any) {
    console.error('Error in deleteProduct API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to delete product' }, { status: 500 });
  }
}
