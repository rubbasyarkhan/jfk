import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const webpBuffer = await sharp(buffer)
      .webp({ quality: 85, effort: 6 })
      .toBuffer();

    return new NextResponse(new Uint8Array(webpBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Content-Length': webpBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    console.error('WebP conversion error:', err);
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
}
