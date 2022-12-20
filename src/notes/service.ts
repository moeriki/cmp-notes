import * as persistenceService from './persistence-service';
import type { Note } from './types';

export async function create(note: Note): Promise<Note> {
	return persistenceService.put(note);
}

export const findAll = persistenceService.scan;

export async function markComplete(note: Note): Promise<Note> {
	if (note.isComplete) {
		return note;
	}
	return persistenceService.put({ ...note, isComplete: true });
}

export const queryForUser = persistenceService.scan;

export async function update(note: Note): Promise<Note> {
	if (note.isComplete) {
		throw new Error('Cannot update a completed note');
	}
	return persistenceService.put(note);
}
