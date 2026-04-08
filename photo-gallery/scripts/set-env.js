const { replaceInFile } = require('replace-in-file');

const pexelsApiKey = process.env.PEXELS_API_KEY || '';
const pexelsApiUrl = process.env.PEXELS_API_URL || 'https://api.pexels.com/v1';
const pexelsApiUrlVideos = process.env.PEXELS_API_URL_VIDEOS || 'https://api.pexels.com/videos';

const options = {
  files: 'src/environments/environment.prod.ts',
  from: [
    /pexelsApiKey: ''/g,
    /pexelsApiUrl: ''/g,
    /pexelsApiUrlVideos: ''/g
  ],
  to: [
    `pexelsApiKey: '${pexelsApiKey}'`,
    `pexelsApiUrl: '${pexelsApiUrl}'`,
    `pexelsApiUrlVideos: '${pexelsApiUrlVideos}'`
  ],
};

replaceInFile(options)
  .then(results => {
    console.log('Environment variables replaced successfully');
    console.log('Modified files:', results.map(r => r.file).join(', '));
  })
  .catch(error => {
    console.error('Error replacing environment variables:', error);
    process.exit(1);
  });
