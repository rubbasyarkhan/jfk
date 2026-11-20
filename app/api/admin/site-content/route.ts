import { NextRequest, NextResponse } from 'next/server';
import {
  readServerSiteContent,
  writeServerSiteContent,
} from '@/lib/serverStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const content = readServerSiteContent();
    return NextResponse.json({ success: true, content });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to read site content' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const current = readServerSiteContent();
    const updated = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    writeServerSiteContent(updated);
    return NextResponse.json({ success: true, content: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to save site content' },
      { status: 500 }
    );
  }
}
