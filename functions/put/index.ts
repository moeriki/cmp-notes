import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { Note, putNote } from '@doa/lib';

export async function handler(
	event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
	if (event.body === null) {
		return {
			statusCode: 400,
			body: 'Missing body',
		};
	}
	const note = JSON.parse(event.body) as Note;
	await putNote(note);
	return {
		statusCode: 200,
		body: JSON.stringify(note),
	};
}
