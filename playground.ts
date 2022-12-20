import cuid from 'cuid';
import * as dotenv from 'dotenv';

import * as notePersistenceService from './src/note-persistence-service';

dotenv.config();

const userId = '681a1ee7-b18c-4757-99a5-ab4938fa5c90';

try {
	// await notePersistenceService.putNote({
	// 	note: 'Hello, world!',
	// 	noteId: cuid(),
	// 	userId,
	// });
	// const notes = await notePersistenceService.queryForUser(userId);
	const notesIterable = await notePersistenceService.scan();
	for await (const notes of notesIterable) {
		console.log(notes);
	}
} catch (error) {
	console.error(error);
}
