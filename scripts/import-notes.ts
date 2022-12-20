import fs from 'node:fs/promises';

import { noteService, type Note } from '../src/notes';

const notes = JSON.parse(
	await fs.readFile(new URL('notes.json', import.meta.url), 'utf8'),
) as Note[];

for (const note of notes) {
	noteService.create(note);
}
