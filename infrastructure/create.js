#!/usr/bin/env zx

import { $ } from 'zx';

await $`aws cloudformation create-stack ${[
	'--stack-name',
	'cmp-notes-mrk-stack',
	'--template-body',
	'file://infrastructure/stack.yaml',
]}`;
