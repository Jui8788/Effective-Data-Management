import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/products/product.route';
import { OrderRoutes } from './modules/orders/order.route';
import notFoundRoute from './notFoundRoute';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

export default app;
