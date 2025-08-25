import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sslcz } from '../../utils/sslcommerz';
import { Order } from './ssl.order.model';

export const PaymentOrder = catchAsync(async (req: Request, res: Response) => {
  const { amount, cus_name, cus_email, total_product, total_price } = req.body;
  // unique transaction ID
  const tran_id = 'ORDER_' + Date.now();

  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: tran_id,
    success_url: `http://localhost:4000/api/v1/orderPayment/success/${tran_id}`,
    fail_url: `http://localhost:4000/api/v1/orderPayment/failed/${tran_id}`,
    cancel_url: `http://localhost:4000/api/v1/orderPayment/canceled/${tran_id}`,
    ipn_url: `http://localhost:4000/api/v1/orderPayment/ipn/${tran_id}`,
    shipping_method: 'Courier',
    product_name: 'group of product',
    product_category: 'group of product category',
    product_profile: 'general',
    cus_name,
    cus_email,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: cus_name,
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: '1000',
    ship_country: 'Bangladesh',
  };

  const apiResponse = await sslcz.init(data);
  const GatewayPageURL = apiResponse.GatewayPageURL;

  if (GatewayPageURL) {
    // Save order in DB
    await Order.create({
      tran_id,
      amount,
      currency: 'BDT',
      cus_name,
      cus_email,
      total_product,
      total_price,
      paymentStatus: 'INITIATED',
    });

    return res.json({ url: GatewayPageURL }); // frontend will redirect
  } else {
    return res.status(400).json({ message: 'Payment gateway init failed.' });
  }
});

export const PaymentOrderSuccess = catchAsync(
  async (req: Request, res: Response) => {
    const { transId } = req.params;

    const result = await Order.updateOne(
      { tran_id: transId },
      { $set: { paymentStatus: 'SUCCESS' } },
    );

    if (result.modifiedCount > 0) {
      return res.redirect(`http://localhost:3000/paymentSuccess/${transId}`);
    } else {
      return res.status(404).json({
        message: 'Transaction not found or already updated',
        transId,
      });
    }
  },
);

export const PaymentOrderFailed = catchAsync(
  async (req: Request, res: Response) => {
    const { transId } = req.params;

    const result = await Order.updateOne(
      { tran_id: transId },
      { $set: { paymentStatus: 'FAILED' } },
    );

    if (result.modifiedCount > 0) {
      return res.redirect(`http://localhost:3000/paymentFailed/${transId}`);
    } else {
      return res.status(404).json({
        message: 'Transaction not found or already updated',
        transId,
      });
    }
  },
);
