import aws from 'aws-sdk';

const documentClient = new aws.DynamoDB.DocumentClient();

const TableName = 'cmp-notes-mrk-note-table';

export interface PersistenceNote {
	isFavorite?: boolean;
	note: string;
	noteId: string;
	userId: string;
}

export async function putNote(note: PersistenceNote) {
	await documentClient
		.put({
			TableName,
			Item: note,
		})
		.promise();
}
