import dependencyInjector from './dependencyInjector';
import expressLoader from './express';

export default async ({expressApp}) => {
  expressLoader({app: expressApp});
  dependencyInjector();
};
