const fs = require('fs');
const path = require('path');

const pexelsApiKey = process.env.PEXELS_API_KEY || '';
const pexelsApiUrl = process.env.PEXELS_API_URL || 'https://api.pexels.com/v1';
const pexelsApiUrlVideos = process.env.PEXELS_API_URL_VIDEOS || 'https://api.pexels.com/videos';

const envDir = path.join(__dirname, '..', 'src', 'app', 'environments');

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Template pour environment.ts (dev)
const environmentDevContent = `export const environment = {
  production: false,
  pexelsApiKey: '${pexelsApiKey}',
  pexelsApiUrl: '${pexelsApiUrl}',
  pexelsApiUrlVideos: '${pexelsApiUrlVideos}'
};
`;

// Template pour environment.prod.ts (production)
const environmentProdContent = `export const environment = {
  production: true,
  pexelsApiKey: '${pexelsApiKey}',
  pexelsApiUrl: '${pexelsApiUrl}',
  pexelsApiUrlVideos: '${pexelsApiUrlVideos}'
};
`;

try {
  // Créer environment.ts
  fs.writeFileSync(
    path.join(envDir, 'environment.ts'),
    environmentDevContent,
    'utf8'
  );
  console.log('✅ environment.ts created');

  // Créer environment.prod.ts
  fs.writeFileSync(
    path.join(envDir, 'environment.prod.ts'),
    environmentProdContent,
    'utf8'
  );
  console.log('✅ environment.prod.ts created');

} catch (error) {
  console.error('❌ Error creating environment files:', error);
  process.exit(1);
}
