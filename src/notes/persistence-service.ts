import aws from 'aws-sdk';

import { NotesTableName } from '../constants';
import type { PersistenceNote } from './types';

const documentClient = new aws.DynamoDB.DocumentClient({
	region: 'eu-central-1',
});

export async function put(note: PersistenceNote): Promise<PersistenceNote> {
	await documentClient.put({ Item: note, TableName: NotesTableName }).promise();
	return note;
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

export async function* scan({
	limit = 10,
}: {
	limit?: number;
} = {}): AsyncGenerator<PersistenceNote[]> {
	let hasNext = true;
	const parameters: aws.DynamoDB.DocumentClient.ScanInput = {
		Limit: limit,
		TableName: NotesTableName,
	};
	do {
		const result = await documentClient.scan(parameters).promise();
		yield result.Items as PersistenceNote[];
		hasNext = Boolean(result.LastEvaluatedKey);
		if (hasNext) {
			parameters.ExclusiveStartKey = result.LastEvaluatedKey;
		}
	} while (hasNext);
}
