import ProductRepository from '../repository/product';
import Container, { Inject, Service } from 'typedi';
import { Logger } from 'winston';

interface Product {
    product_name: string;
    description: string;
    price: string;
    timestamp: string;
    username: string;
}

//DONE: Call repository functions for each service function
@Service()
export default class ProductService {
    constructor(
        @Inject('logger') private logger: Logger,
        private productRepository = Container.get(ProductRepository)
    ) { }

    private async hasProduct(product: string) {
        const products = await this.productRepository.getProduct();

        return products.map(product => product.product_name).includes(product) || products.map(product => product.timestamp).includes(product);
    }

    public async createProduct(product: Product) {
        this.logger.info('Service: Creating product');

        if(await this.hasProduct(product.product_name)) {
            this.logger.warn('Product ' + product.product_name + ' already exists.');
        }

        return this.productRepository.createProduct(product);
    }

    public async getProduct() {
        this.logger.info('Service: Getting product');
        return this.productRepository.getProduct();
    }

    public async updateProduct(timestamp: string, product: Product) {
        this.logger.info('Service: Updating product');

        if (!await this.hasProduct(timestamp)) {
            this.logger.warn('No product with timestamp ' + timestamp + ' has been found. No products will be updated.');
        }

        const result = await this.productRepository.updateProduct(timestamp, product);

        return result
    }

    public async deleteProduct(timestamp: string) {
        this.logger.info('Service: Deleting product');

        if (!await this.hasProduct(timestamp)) {
            this.logger.warn('No product with name ' + timestamp + ' has been found. No products will be deleted.');
        }

        const result = await this.productRepository.deleteProduct(timestamp);

        return result
    }
}