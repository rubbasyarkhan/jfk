import { NextRequest, NextResponse } from 'next/server';
import { getCategories, createCategory } from '@/lib/firestore';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ success: true, categories });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const id = await createCategory({
      name: body.name,
      slug,
      description: body.description || '',
      bannerText: body.bannerText || '',
      imageUrl: body.imageUrl || '',
      sortOrder: Number(body.sortOrder) || 1,
    });

    return NextResponse.json({ success: true, id, slug });
  } catch (err: any) {
    console.error('Error in createCategory API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to create category' }, { status: 500 });
  }
}
