#!/usr/bin/env zx

import { $ } from 'zx';

const stackName = 'cmp-notes-mrk-stack';

try {
	await $`aws cloudformation update-stack ${[
		'--stack-name',
		stackName,
		'--template-body',
		'file://stack.yaml',
	]}`;
} catch (error) {
	if (error instanceof Error && error.message.includes('No updates')) {
		console.log('No updates to be performed.');
	} else {
		throw error;
	}
}

const stackArn = await $`aws cloudformation describe-stacks ${[
	'--stack-name',
	stackName,
	'--output',
	'text',
	'--query',
	'Stacks[].StackId',
]}`;

await $`aws cloudformation wait stack-update-complete ${[
	'--stack-name',
	stackArn,
]}`;

await $`aws s3 sync './html/.' 's3://cmp-notes-mrk-app-bucket/'`;
