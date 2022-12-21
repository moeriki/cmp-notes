import { APIGatewayProxyResult } from 'aws-lambda';

// import {} from '../notes';

export async function handler(): Promise<APIGatewayProxyResult> {
	return {
		statusCode: 500,
		body: JSON.stringify({ message: 'Not implemented' }),
	};
}
