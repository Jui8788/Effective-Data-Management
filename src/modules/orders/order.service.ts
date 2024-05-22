import { Order } from './order.model';

const createOrderIntoDB = async (orderData: string) => {
  const newOrder = new Order(orderData);
  return await newOrder.save();
};

export const OrderServices = {
  createOrderIntoDB,
};
