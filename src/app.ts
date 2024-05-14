import 'reflect-metadata';
import express from 'express';
import Logger from './loaders/logger';

export default async function startServer() {
  const app = express();

  await require('./loaders').default({expressApp: app});

  app
    .listen(8000, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${8000} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
