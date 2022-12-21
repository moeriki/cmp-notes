#!/usr/bin/env bash

set -e

pnpm run build

sam build \
  --base-dir . \
  --template infrastructure/stack.yaml

sam deploy \
  --capabilities CAPABILITY_NAMED_IAM \
  --no-fail-on-empty-changeset \
  --s3-bucket cmp-notes-mrk-deploy-bucket \
  --stack-name cmp-notes-mrk-stack \
  --template .aws-sam/build/template.yaml

aws s3 sync './html/.' 's3://cmp-notes-mrk-app-bucket/'
