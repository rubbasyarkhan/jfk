import { NextRequest, NextResponse } from 'next/server';
import { readServerCategories, writeServerCategories } from '@/lib/serverStore';
import type { Category } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = readServerCategories();
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

    const categories = readServerCategories();
    const slug =
      body.slug ||
      body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const newId = body.id || slug || `cat-${Date.now()}`;

    const newCat: Category = {
      id: newId,
      name: body.name,
      slug,
      description: body.description || '',
      bannerText: body.bannerText || '',
      imageUrl: body.imageUrl || '',
      sortOrder: Number(body.sortOrder) || categories.length + 1,
    };

    const existingIdx = categories.findIndex((c) => c.id === newId || c.slug === slug);
    if (existingIdx !== -1) {
      categories[existingIdx] = newCat;
    } else {
      categories.push(newCat);
    }

    writeServerCategories(categories);
    return NextResponse.json({ success: true, id: newId, slug, category: newCat });
  } catch (err: any) {
    console.error('Error in createCategory API:', err);
    return NextResponse.json({ error: err?.message || 'Failed to create category' }, { status: 500 });
  }
}
