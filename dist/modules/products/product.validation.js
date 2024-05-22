"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
//  Variant schema
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: 'Type is required' }),
    value: zod_1.z.string().min(1, { message: 'Value is required' }),
});
// Inventory schema
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative({ message: 'Quantity must be a non-negative integer' }),
    inStock: zod_1.z.boolean().refine((val) => typeof val === 'boolean', {
        message: 'InStock must be a boolean',
    }),
});
// Product schema
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Name is required' }),
    description: zod_1.z.string().min(1, { message: 'Description is required' }),
    price: zod_1.z
        .number()
        .nonnegative({ message: 'Price must be a non-negative number' }),
    category: zod_1.z.string().min(1, { message: 'Category is required' }),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, { message: 'Tag cannot be empty' }))
        .min(1, { message: 'Tags are required' }),
    variants: zod_1.z.array(variantValidationSchema).optional(),
    inventory: inventoryValidationSchema.optional(),
});
exports.default = productValidationSchema;
