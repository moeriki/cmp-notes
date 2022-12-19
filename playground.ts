import fs from 'node:fs';

import * as dotenv from 'dotenv';

import * as storageService from './src/storage-service.js';

dotenv.config();

// try {
// 	await s3Service.putObject('audio.m4a', fs.createReadStream('audio.m4a'));
// 	await new Promise((resolve, reject) => {
// 		s3Service
// 			.getObject('audio.m4a')
// 			.pipe(fs.createWriteStream('audio2.m4a'))
// 			.once('error', reject)
// 			.once('finish', resolve);
// 	});
// } catch (error) {
// 	console.error(error);
// }
