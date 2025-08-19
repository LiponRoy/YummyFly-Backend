import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { productServices } from "./product.service";
import sendResponse from "../../utils/sendResponse";

// const sendResponse = <T>(res: Response, data: TResponse<T>) => {
//   res.status(data?.statusCode).json({
//     success: data.success,
//     message: data.message,
//     meta: data.meta,
//     data: data.data,
//   });
// };

// create product
export const createProduct = catchAsync(async (req: Request, res: Response) => {
  
    const product = await productServices.createProduct(req.body);


    sendResponse(res, {
			statusCode: 201,
			success: true,
			message: 'Products Created Successfully !',
			data: product,
		});
  
});

// get all products
export const getAllProducts = async (req: Request, res: Response) => {
  
    const products = await productServices.getAllProducts();
  
     sendResponse(res, {
			statusCode: 201,
			success: true,
			message: 'Products Getting Successfully !',
			data: products,
		});
 
};

export const productController={
createProduct,
getAllProducts
}