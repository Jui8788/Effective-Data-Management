import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),

  productId: z.string().min(1, { message: 'Product ID is required' }),

  price: z
    .number()
    .nonnegative({ message: 'Price must be a non-negative number' })
    .min(0, { message: 'Price must be at least 0' }),

  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' })
    .min(1, { message: 'Quantity must be at least 1' }),
});

export default orderValidationSchema;
