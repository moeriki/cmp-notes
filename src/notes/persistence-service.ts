import aws from 'aws-sdk';

import { NotesTableName } from '../constants';
import type { Note } from './types';

const documentClient = new aws.DynamoDB.DocumentClient({
	region: 'eu-central-1',
});

export async function put(note: Note): Promise<Note> {
	await documentClient.put({ Item: note, TableName: NotesTableName }).promise();
	return note;
}

export async function queryForUser(userId: string): Promise<Note[]> {
	const result = await documentClient
		.query({
			ExpressionAttributeValues: { ':userId': userId },
			KeyConditionExpression: 'userId = :userId',
			TableName: NotesTableName,
		})
		.promise();
	return result.Items as Note[];
}

export async function* scan({
	limit = 10,
}: {
	limit?: number;
} = {}): AsyncGenerator<Note[]> {
	let hasNext = true;
	const parameters: aws.DynamoDB.DocumentClient.ScanInput = {
		Limit: limit,
		TableName: NotesTableName,
	};
	do {
		const result = await documentClient.scan(parameters).promise();
		yield result.Items as Note[];
		hasNext = Boolean(result.LastEvaluatedKey);
		if (hasNext) {
			parameters.ExclusiveStartKey = result.LastEvaluatedKey;
		}
	} while (hasNext);
}
