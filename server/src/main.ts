import express from 'express';
import { connectDatabase } from './infra/database/config/start';
import productRouter from './interfaces/routes/Product.routes';
import orderRouter from './interfaces/routes/Order.route';

const main = async () =>{
  await connectDatabase();
const app = express();
const port = 3000;

app.use(express.json());

app.use('/',productRouter);
app.use('/',orderRouter);
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

}
main();