import * as persistenceService from './persistence-service';
import type { Note, PersistenceNote } from './types';

export async function create(note: Note): Promise<Note> {
	return mapFromPersistence(
		await persistenceService.put(mapToPersistence(note)),
	);
}

export async function* findAll(): AsyncGenerator<Note[]> {
	for await (const notes of persistenceService.scan()) {
		yield notes.map((note) => mapFromPersistence(note));
	}
}

export async function markComplete(note: Note): Promise<Note> {
	if (note.isComplete) {
		return note;
	}
	return mapFromPersistence(
		await persistenceService.put(
			mapToPersistence({ ...note, isComplete: true }),
		),
	);
}

export async function queryForUser(userId: string): Promise<Note[]> {
	const notes = await persistenceService.queryForUser(userId);
	return notes.map((note) => mapFromPersistence(note));
}

export async function update(note: Note): Promise<Note> {
	return mapFromPersistence(
		await persistenceService.putIfIncomplete(mapToPersistence(note)),
	);
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
