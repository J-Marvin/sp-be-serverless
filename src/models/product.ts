import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  product_name: string;
  description: string;
  price: string;
}

const productSchema = new Schema<IProduct>({
  product_name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
});

const ProductModel = mongoose.model<IProduct>('Product', productSchema);

export default ProductModel;
