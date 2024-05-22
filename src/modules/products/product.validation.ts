import { z } from 'zod';

//  Variant schema
const variantValidationSchema = z.object({
  type: z.string().min(1, { message: 'Type is required' }),
  value: z.string().min(1, { message: 'Value is required' }),
});

// Inventory schema
const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative({ message: 'Quantity must be a non-negative integer' }),
  inStock: z.boolean().refine((val) => typeof val === 'boolean', {
    message: 'InStock must be a boolean',
  }),
});

// Product schema
const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z
    .number()
    .nonnegative({ message: 'Price must be a non-negative number' }),
  category: z.string().min(1, { message: 'Category is required' }),
  tags: z
    .array(z.string().min(1, { message: 'Tag cannot be empty' }))
    .min(1, { message: 'Tags are required' }),
  variants: z.array(variantValidationSchema).optional(),
  inventory: inventoryValidationSchema.optional(),
});

export default productValidationSchema;
