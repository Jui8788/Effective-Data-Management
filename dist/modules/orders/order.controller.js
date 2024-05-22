"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const product_service_1 = require("../products/product.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orderData = req.body;
        // Check if the product exists
        const product = yield product_service_1.ProductServices.getSingleProductFromDB(orderData.productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        // Check if the ordered quantity exceeds the available quantity
        if (orderData.quantity > (((_a = product.inventory) === null || _a === void 0 ? void 0 : _a.quantity) || 0)) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }
        // Update the inventory quantity and inStock property
        if (product.inventory) {
            // Calculate updated quantity and inStock
            const updatedQuantity = (product.inventory.quantity || 0) - orderData.quantity;
            const updatedInStock = updatedQuantity > 0;
            // Prepare update data
            const updateData = {
                inventory: {
                    quantity: updatedQuantity,
                    inStock: updatedInStock,
                },
            };
            // Update the product in the database
            yield product_service_1.ProductServices.updateProductFromDB(product._id.toString(), updateData);
        }
        // Create the order
        const result = yield order_service_1.OrderServices.createOrderIntoDB(orderData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
    // try {
    //   const orderData = req.body;
    //   const result = await OrderServices.createOrderIntoDB(orderData);
    //   res.status(201).json({
    //     success: true,
    //     message: 'Order created successfully!',
    //     data: result,
    //   });
    // } catch (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error,
    //   });
    // }
});
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
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (email && typeof email === 'string') {
            const result = yield order_service_1.OrderServices.getOrdersByEmailFromDB(email);
            return res.status(200).json({
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: result,
            });
        }
        else {
            const result = yield order_service_1.OrderServices.getAllOrdersFromDB();
            return res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getOrders,
    // getAllOrder,
    // getOrderByEmail,
};
