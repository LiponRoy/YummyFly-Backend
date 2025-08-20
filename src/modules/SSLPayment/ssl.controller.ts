import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sslcz } from "../../utils/sslcommerz";
import { Order } from "./ssl.order.model";

export const PaymentOrder = catchAsync(async (req: Request, res: Response) => {
  const { amount, cus_name, cus_email, total_product, total_price } = req.body;
  const tran_id = "ORDER_" + Date.now(); // unique transaction ID

 
    // Save new order
    const order = await Order.create({
      tran_id,
      amount,
      currency: "BDT",
      cus_name,
      cus_email,
      total_product,
      total_price,
      status: "INITIATED",
    });

    console.log("order...: ",order);

    // const data = {
    //   total_amount: order.amount,
    //   currency: order.currency,
    //   tran_id: order.tran_id,
    //   success_url: "http://localhost:3030/success",
    //   fail_url: "http://localhost:3030/fail",
    //   cancel_url: "http://localhost:3030/cancel",
    //   ipn_url: "http://localhost:3030/ipn",
    //   shipping_method: "Courier",
    //   product_name: "group of product",
    //   product_category: "group of product category",
    //   product_profile: "general",
    //   cus_name: order.cus_name,
    //   cus_email: order.cus_email,
    //   cus_add1: "Dhaka",
    //   cus_add2: "Dhaka",
    //   cus_city: "Dhaka",
    //   cus_state: "Dhaka",
    //   cus_postcode: "1000",
    //   cus_country: "Bangladesh",
    //   cus_phone: "01711111111",
    //   cus_fax: "01711111111",
    //   ship_name: order.cus_name,
    //   ship_add1: "Dhaka",
    //   ship_add2: "Dhaka",
    //   ship_city: "Dhaka",
    //   ship_state: "Dhaka",
    //   ship_postcode: "1000",
    //   ship_country: "Bangladesh",
    // };

    // const apiResponse = await sslcz.init(data);
    // const GatewayPageURL = apiResponse.GatewayPageURL;

    // if (GatewayPageURL) {
    //   console.log("Redirecting to:", GatewayPageURL);
    //   return res.json({ url: GatewayPageURL }); // frontend will redirect
    // } else {
    //   return res.status(400).json({ message: "Payment gateway init failed" });
    // }
 
});