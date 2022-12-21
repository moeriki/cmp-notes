export interface Note {
	isComplete?: boolean;
	isFavorite?: boolean;
	note: string;
	noteId: string;
	userId: string;
}

export interface PersistenceNote {
	isComplete?: string;
	isFavorite?: boolean;
	note: string;
	noteId: string;
	userId: string;
}
