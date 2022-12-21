import aws from 'aws-sdk';

import type { PersistenceNote } from './types.js';

const TableName = process.env.NOTES_TABLE_NAME!;

const documentClient = new aws.DynamoDB.DocumentClient({
	region: 'eu-central-1',
});

export async function put(note: PersistenceNote): Promise<PersistenceNote> {
	await documentClient
		.put({
			ConditionExpression:
				'attribute_not_exists(isComplete) OR isComplete = false',
			Item: note,
			TableName,
		})
		.promise();
	return note;
}

export async function queryForUser(userId: string): Promise<PersistenceNote[]> {
	const result = await documentClient
		.query({
			ExpressionAttributeValues: { ':userId': userId },
			KeyConditionExpression: 'userId = :userId',
			TableName,
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
		TableName,
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
