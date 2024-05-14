// import mongoose, { Document, Schema } from 'mongoose';
import * as dynamoose from 'dynamoose';
import {Schema} from 'dynamoose';
import {Item} from 'dynamoose/dist/Item';

class Product extends Item{
  product_name: string;
  description: string;
  price: string;
  timestamp: string;
  username: string;
  location: string;
}

const productSchema = new Schema({
  timestamp: {type: String, required: true},
  username: {type: String, rangeKey: true},
  product_name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  location: {type: String, required: false}
});

const ProductModel = dynamoose.model<Product>('aiip2023-static-website', productSchema);

export default ProductModel;
