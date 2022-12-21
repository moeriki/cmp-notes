import { APIGatewayProxyResult } from 'aws-lambda';

import { queryNotesForUser, userId } from '@doa/lib';

export async function handler(): Promise<APIGatewayProxyResult> {
	const notes = await queryNotesForUser(userId);
	return {
		statusCode: 200,
		body: JSON.stringify(notes),
	};
}
