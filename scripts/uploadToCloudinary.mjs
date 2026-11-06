import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'ovmougmy',
  api_key: '759266941214867',
  api_secret: 'lc1e6lM-wk5qkI3pRmHkR8y-hfU',
  secure: true,
});

const IMAGES_TO_UPLOAD = [
  // Local assets
  { id: 'logo', path: 'public/assets/logo.png', isLocal: true },
  { id: 'hero-main', path: 'public/assets/heromain.jpg', isLocal: true },
  { id: 'collection-story', path: 'public/assets/collection-story.jpg', isLocal: true },
  { id: 'cognac-hero', path: 'public/assets/inspiration/cognac-hero.jpg', isLocal: true },
  { id: 'reservebar-wines', path: 'public/assets/inspiration/reservebar-wines.jpg', isLocal: true },
  { id: 'spirits-vault', path: 'public/assets/inspiration/spirits-vault.jpg', isLocal: true },
  { id: 'whisky-foundation', path: 'public/assets/inspiration/whisky-foundation.jpg', isLocal: true },

  // Remote pure bottle photography
  { id: 'bourbon-jim-beam', path: 'https://images.unsplash.com/photo-1604681310895-d3ddfd650861?auto=format&fit=crop&w=1200&q=85', isLocal: false },
  { id: 'scotch-single-malt', path: 'https://images.unsplash.com/photo-1653596662119-95f12558a15a?auto=format&fit=crop&w=1200&q=85', isLocal: false },
  { id: 'vodka-spirits-studio', path: 'https://images.unsplash.com/photo-1656618380465-5e9342d4874e?auto=format&fit=crop&w=1200&q=85', isLocal: false },
  { id: 'wine-silver-oak', path: 'https://images.unsplash.com/photo-1645784125191-d93e079b5861?auto=format&fit=crop&w=1200&q=85', isLocal: false },
  { id: 'wine-dark-bottle', path: 'https://images.unsplash.com/photo-1555554317-78e53094da14?auto=format&fit=crop&w=1200&q=85', isLocal: false },
  { id: 'wine-white-bottle', path: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&w=1200&q=85', isLocal: false },
  { id: 'wine-champagne', path: 'https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?auto=format&fit=crop&w=1200&q=85', isLocal: false },
  { id: 'beer-dark-bottle', path: 'https://images.unsplash.com/photo-1703564803585-48b51539e119?auto=format&fit=crop&w=1200&q=85', isLocal: false },
  { id: 'beer-craft-bottles', path: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=1200&q=85', isLocal: false },
  { id: 'tequila-don-julio', path: 'https://images.unsplash.com/photo-1698288547419-407ca6bafe2a?auto=format&fit=crop&w=1200&q=85', isLocal: false },
  { id: 'tequila-jose-cuervo', path: 'https://images.unsplash.com/photo-1516535794938-6063878f08cc?auto=format&fit=crop&w=1200&q=85', isLocal: false },
];

async function run() {
  const mapping = {};
  console.log(`Starting upload of ${IMAGES_TO_UPLOAD.length} images to Cloudinary (cloud: ovmougmy)...`);

  for (const item of IMAGES_TO_UPLOAD) {
    try {
      console.log(`Uploading ${item.id}...`);
      let source = item.path;
      if (item.isLocal) {
        source = path.resolve(process.cwd(), item.path);
        if (!fs.existsSync(source)) {
          console.warn(`Local file not found: ${source}`);
          continue;
        }
      }

      const res = await cloudinary.uploader.upload(source, {
        folder: 'jfk-liquors',
        public_id: item.id,
        overwrite: true,
        resource_type: 'image',
      });

      console.log(`✓ Uploaded ${item.id} -> ${res.secure_url}`);
      mapping[item.id] = {
        original: item.path,
        cloudinaryUrl: res.secure_url,
        publicId: res.public_id,
        width: res.width,
        height: res.height,
      };
    } catch (err) {
      console.error(`✗ Error uploading ${item.id}:`, err.message);
    }
  }

  fs.writeFileSync('lib/cloudinaryMap.json', JSON.stringify(mapping, null, 2));
  console.log('Successfully saved mapping to lib/cloudinaryMap.json');
}

run();
