import aws from 'aws-sdk';

const s3 = new aws.S3({
	region: 'eu-central-1',
});

try {
	const { Contents: bucketObjects = [] } = await s3
		.listObjects({ Bucket: 'cmp-notes-bucket-mrk' })
		.promise();
	console.dir({ bucketObjects });
} catch (error) {
	console.error(error);
}
