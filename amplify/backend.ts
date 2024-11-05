import * as iam from "aws-cdk-lib/aws-iam";
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { storage } from './storage/resource.js';

const backend = defineBackend({
  auth,
  data,
  storage,
});

// Access the S3 bucket
// const s3Bucket = backend.storage.resources.bucket;

// s3Bucket.addToResourcePolicy(new iam.PolicyStatement({
//   effect: iam.Effect.ALLOW,
//   principals: [new iam.ArnPrincipal('*')], // Allows any principal
//   actions: ['s3:GetObject'], // Action to allow
//   resources: [`arn:aws:s3:::${s3Bucket.bucketName}/*`], // Resource to apply the policy
// }));