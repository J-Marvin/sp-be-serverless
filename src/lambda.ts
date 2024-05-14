import serverlessExpress from '@vendia/serverless-express';
import express from 'express';
import 'reflect-metadata';

let serverlessExpressInstance;

async function setup(event, context) {
  const app = express();

  await require('./loaders').default({expressApp: app});

  serverlessExpressInstance = serverlessExpress({app});
  return serverlessExpressInstance(event, context);
}

export const handler = async (event, context) => {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context);
  return setup(event, context);
};
