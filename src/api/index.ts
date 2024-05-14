import {Router} from 'express';
import product from './routes/product';

const routes = () => {
  const app = Router();
  product(app);

  return app;
};

export default routes;
