import express from 'express';
import { connectDatabase } from './infra/database/config/start';
import productRouter from './interfaces/routes/Product.routes';
import orderRouter from './interfaces/routes/Order.route';
import { startOrderCreatedConsumer } from './infra/messaging/OrderCreatedConsumer';
import { startOrderPaidConsumer } from './infra/messaging/OrderPaidConsumer';
import cors from 'cors';
import authRoute from './interfaces/routes/Auth.route';
const main = async () =>{
  await connectDatabase();
  await startOrderCreatedConsumer();
  await startOrderPaidConsumer();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

app.use('/',productRouter);
app.use('/',orderRouter);
app.use('/',authRoute);
app.listen(port, () => {
  console.log(`Servidor rodando em http://server:${port}`);
});

}
main();