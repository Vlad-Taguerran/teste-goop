import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'; // não se esqueça de instalar com: npm i bcrypt

export interface IClient extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const ClientSchema = new Schema<IClient>({
  _id: { type: String, required: true }, // UUID gerado pela aplicação
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type:String, require: true},
  createdAt: { type: Date, required: true }
});

ClientSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

export const ClientModel = model('Clients', ClientSchema);