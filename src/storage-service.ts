import { Readable } from 'node:stream';

import aws from 'aws-sdk';

const Bucket = 'cmp-notes-bucket-mrk';

const s3 = new aws.S3({
	region: 'eu-central-1',
});

export function getObject(Key: string) {
	return s3.getObject({ Bucket, Key }).createReadStream();
}

export async function listObjects() {
	const { Contents: bucketObjects = [] } = await s3
		.listObjects({ Bucket })
		.promise();
	return bucketObjects;
}

export async function putObject(Key: string, Body: Readable) {
	await s3.putObject({ Bucket, Key, Body }).promise();
}
