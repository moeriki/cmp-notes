import fs from 'node:fs/promises';

import type { PersistenceNote } from '../src/persistence-types';
import * as notePersistenceService from '../src/note-persistence-service';

const notes = JSON.parse(
	await fs.readFile(new URL('notes.json', import.meta.url), 'utf8'),
) as PersistenceNote[];

for (const note of notes) {
	notePersistenceService.putNote(note);
}
