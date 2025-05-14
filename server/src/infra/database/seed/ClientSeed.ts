import { v4 as uuidv4 } from 'uuid'; // Para gerar o UUID
import { ClientModel } from '../mongoDB/schemas/ClientSchema';
import bcrypt from 'bcryptjs/umd/types';

export default async function  createClientSeed() {
  const clientData = {
      _id: uuidv4(),
      name: 'Cliente 1',
      email: 'cliente1@example.com',
      password: 'senha123', 
      createdAt: new Date(),
    }

    
   try {
     await ClientModel.create({
      ...clientData,
    });

   } catch (error: any) {
         if (error.code === 11000) {
      console.log(`Produto ${clientData.name} já existe (erro de chave duplicada). Pulando.`);
    } else {
      console.error(`Erro inesperado ao criar produto ${clientData.name}:`, error);
    }
   }
    console.log(`Cliente ${clientData.name} criado com sucesso!`);
  }

createClientSeed().catch((err) => console.error('Erro ao criar clientes:', err));
