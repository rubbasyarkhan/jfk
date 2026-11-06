import { NextRequest, NextResponse } from 'next/server';
import { updateCategory, deleteCategory } from '@/lib/firestore';

interface Props {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const body = await req.json();
    await updateCategory(params.id, body);
    return NextResponse.json({ success: true, message: 'Category updated successfully' });
  } catch (err: any) {
    console.error('Error in updateCategory API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    await deleteCategory(params.id);
    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (err: any) {
    console.error('Error in deleteCategory API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to delete category' }, { status: 500 });
  }
}
