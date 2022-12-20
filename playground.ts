import cuid from 'cuid';
import * as dotenv from 'dotenv';

import * as notePersistenceService from './src/note-persistence-service';

dotenv.config();

const userId = '681a1ee7-b18c-4757-99a5-ab4938fa5c90';

try {
	await notePersistenceService.putNote({
		note: 'Hello, world!',
		noteId: cuid(),
		userId,
	});
	const notes = await notePersistenceService.findNotesForUser(userId);
	console.log(notes);
} catch (error) {
	console.error(error);
}
