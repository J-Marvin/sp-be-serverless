import { Service } from 'typedi';
import ProductModel from '../models/productDynamo';

import * as dynamoose from 'dynamoose';
interface Product {
    product_name: string;
    description: string;
    price: string;
}

if (process.env.NODE_ENV === "development") {
    
    const db = new dynamoose.aws.ddb.DynamoDB({
        "credentials": {
        "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
        "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
        },
        "region": "ap-southeast-1",
        apiVersion: '2012-08-10'
    });

    dynamoose.aws.ddb.set(db);
} else {
    const db = new dynamoose.aws.ddb.DynamoDB({
        "region": "ap-southeast-1",
        apiVersion: '2012-08-10'
    });

    dynamoose.aws.ddb.set(db);
}

@Service()
export default class ProductRepository {

    //DONE: Create a product by using the save function
    public async createProduct(product: Product) {
       return ProductModel.create({username: 'aiip-marvin', ...product});
    };

    //DONE: Get all products by using the find function
    public async getProduct() {
        return ProductModel.scan('username').eq('aiip-marvin').exec();
    };

    //DONE: Update product by using the updateOne function
    public async updateProduct(timestamp: string, product: Product) {
        return ProductModel.update({'timestamp': timestamp, "username": 'aiip-marvin', ...product});
    };

    //DONE: Delete product by using the deleteOne function
    public async deleteProduct(timestamp: string) {
        console.log(timestamp);
        return ProductModel.delete({'timestamp': timestamp, 'username': 'aiip-marvin'});
    };
};