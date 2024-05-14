import ProductService from '../../services/product';
import { Router, Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { param, body, validationResult } from 'express-validator';

const route = Router();

const product = (app: Router) => {
  app.use('/product', route);

  //EXAMPLE
  route.post('/',
    body('product_name').isString(),
    body('description').isString(),
    body('price').isString(),
    body('location').isString(),
    body('timestamp').isString(),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        const productService = Container.get(ProductService);
        const product = await productService.createProduct(req.body);

        return res.status(201).json(product);
        
      } catch (error) {
        return next(error);
      }
    });

  //DONE: Call service
  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productService = Container.get(ProductService);
      const products = await productService.getProduct();
      return res.status(200).json(products);
    } catch (error) {
      return next(error);
    }
  });

  //DONE: Create validation for body and param then return 400 if type is invalid. Call service
  route.put('/:timestamp',
    param('timestamp').isString(),
    body('description').isString(),
    body('price').isString(),
    body('location').isString(),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        
        const productService = Container.get(ProductService);
        await productService.updateProduct(req.params.timestamp, req.body);
        return res.status(200).send();;
      } catch (error) {
        return next(error);
      }
    });

  //DONE: Create validation for param and return 400 if type is invalid. Call service
  route.delete('/:timestamp',
    param('timestamp').isString(),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const productService = Container.get(ProductService);
        await productService.deleteProduct(req.params.timestamp);

        return res.status(200).send();
      } catch (error) {
        return next(error);
      }
    });

};

export default product;
