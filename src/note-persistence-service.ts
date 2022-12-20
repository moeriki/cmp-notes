import aws from 'aws-sdk';
import { NotesTableName } from './constants.js';

const documentClient = new aws.DynamoDB.DocumentClient({
	region: 'eu-central-1',
});

export interface PersistenceNote {
	isFavorite?: boolean;
	note: string;
	noteId: string;
	userId: string;
}

export async function putNote(note: PersistenceNote) {
	await documentClient.put({ Item: note, TableName: NotesTableName }).promise();
}

export async function queryForUser(userId: string): Promise<PersistenceNote[]> {
	const result = await documentClient
		.query({
			ExpressionAttributeValues: { ':userId': userId },
			KeyConditionExpression: 'userId = :userId',
			TableName: NotesTableName,
		})
		.promise();
	return result.Items as PersistenceNote[];
}
