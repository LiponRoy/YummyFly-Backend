import Product from "./product.model";
import { IProduct } from "./product.types";


// create product
const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(data);
  return await product.save();
};

// get all products
const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find();
};


export const productServices={
createProduct,
getAllProducts
}