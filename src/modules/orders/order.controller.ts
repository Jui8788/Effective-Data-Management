import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await OrderServices.createOrderIntoDB(orderData);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// const getAllOrder = async (req: Request, res: Response) => {
//   try {
//     const result = await OrderServices.getAllOrdersFromDB();
//     res.status(201).json({
//       success: true,
//       message: 'Orders fetched successfully!',
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong',
//       error: error,
//     });
//   }
// };

// const getOrderByEmail = async (req: Request, res: Response) => {
//   try {
//     const email: string = req.query.email as string;

//     if (typeof email !== 'string') {
//       throw new Error('Email parameter is missing or invalid');
//     }

//     const result = await OrderServices.getOrdersByEmailFromDb(email);
//     res.status(201).json({
//       success: true,
//       message: 'Orders fetched successfully!',
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong',
//       error: error,
//     });
//   }
// };

const getOrders = async (req: Request, res: Response) => {
  try {
    const email: string | undefined = req.query.email as string;

    if (email && typeof email === 'string') {
      const result = await OrderServices.getOrdersByEmailFromDB(email);
      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      const result = await OrderServices.getAllOrdersFromDB();
      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
  // getAllOrder,
  // getOrderByEmail,
};
