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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_validation_1 = __importDefault(require("./product.validation"));
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // data validation using zod
        const zodParsedData = product_validation_1.default.parse(productData);
        // will call service function to send this data
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        // send response
        res.status(200).json({
            success: true,
            message: 'Product is created successfully',
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
});
// const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     const result = await ProductServices.getAllProductsFromDB();
//     // send response
//     res.status(200).json({
//       success: true,
//       message: 'Products are retrieved successfully',
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
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        if (searchTerm) {
            const result = yield product_service_1.ProductServices.searchProductFromDB(searchTerm);
            return res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: result,
            });
        }
        else {
            const result = yield product_service_1.ProductServices.getAllProductsFromDB();
            return res.status(200).json({
                success: true,
                message: 'Products are retrieved successfully',
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
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        // send response
        res.status(200).json({
            success: true,
            message: 'Product is retrieved successfully',
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
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const result = yield product_service_1.ProductServices.updateProductFromDB(productId, updateData);
        res.status(200).json({
            success: true,
            message: 'Product is updated successfully',
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
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
        // send response
        res.status(200).json({
            success: true,
            message: 'Product is deleted successfully',
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
});
// const searchProduct = async (req: Request, res: Response) => {
//   try {
//     const searchTerm = req.query.searchTerm;
//     if (typeof searchTerm !== 'string') {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid search term',
//       });
//     }
//     const result = await ProductServices.searchProductFromDB(searchTerm);
//     // send response
//     res.status(200).json({
//       success: true,
//       message: `Products matching search term '${searchTerm}' fetched successfully!`,
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
exports.ProductControllers = {
    createProduct,
    // getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    // searchProduct,
};
