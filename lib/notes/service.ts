import { put, queryForUser, scan } from './persistence-service.js';
import type { Note, PersistenceNote } from './types.js';

export async function* findAllNotes(): AsyncGenerator<Note[]> {
	for await (const notes of scan()) {
		yield notes.map((note) => mapFromPersistence(note));
	}
}

export async function markNoteComplete(note: Note): Promise<Note> {
	if (note.isComplete) {
		return note;
	}
	return mapFromPersistence(
		await put(mapToPersistence({ ...note, isComplete: true })),
	);
}

export async function putNote(note: Note): Promise<Note> {
	return mapFromPersistence(await put(mapToPersistence(note)));
}

export async function queryNotesForUser(userId: string): Promise<Note[]> {
	const notes = await queryForUser(userId);
	return notes.map((note) => mapFromPersistence(note));
}

function mapFromPersistence(note: PersistenceNote): Note {
	return {
		...note,
		isComplete:
			note.isComplete == undefined ? undefined : note.isComplete ? true : false,
	};
}

function mapToPersistence(note: Note): PersistenceNote {
	return {
		...note,
		isComplete:
			note.isComplete == undefined
				? undefined
				: note.isComplete
				? 'true'
				: 'false',
	};
}
