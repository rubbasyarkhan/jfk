import { NextRequest, NextResponse } from 'next/server';
import { readServerCategories, writeServerCategories } from '@/lib/serverStore';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const body = await req.json();
    const categories = readServerCategories();
    const idx = categories.findIndex((c) => c.id === params.id || c.slug === params.id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    categories[idx] = {
      ...categories[idx],
      ...body,
      id: categories[idx].id,
    };
    writeServerCategories(categories);
    return NextResponse.json({ success: true, category: categories[idx] });
  } catch (err: any) {
    console.error('Error in updateCategory API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const categories = readServerCategories().filter(
      (c) => c.id !== params.id && c.slug !== params.id
    );
    writeServerCategories(categories);
    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (err: any) {
    console.error('Error in deleteCategory API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to delete category' }, { status: 500 });
  }
}
