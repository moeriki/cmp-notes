import { APIGatewayProxyResult } from 'aws-lambda';

import { queryNotesForUser } from '@doa/lib';

const userId = '681a1ee7-b18c-4757-99a5-ab4938fa5c90';

export async function handler(): Promise<APIGatewayProxyResult> {
	const notes = await queryNotesForUser(userId);
	return {
		statusCode: 200,
		body: JSON.stringify(notes),
	};
}
