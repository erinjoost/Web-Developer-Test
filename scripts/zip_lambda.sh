#!/bin/bash
npm ci --only=prod 

rm -rf ./terraform/resources/lambda/lambda-*.zip

echo "making lambda zip....."
mkdir temp
cp -r api/lambda/. temp
cp -r node_modules/ temp/node_modules/
cp -r package.json temp/package.json

commitId="$(git rev-parse --short HEAD)"
echo 'git_commit_id="'$commitId'"' > terraform/$AWS_PROFILE/terraform.tfvars

cd temp
zip -rq ../terraform/modules/lambda/lambda-$commitId.zip .
cd ..

rm -rf temp/

npm ci