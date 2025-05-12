import { v4 as uuidv4 } from 'uuid'; // Para gerar o UUID
import bcrypt from 'bcrypt';
import { ClientModel } from '../mongoDB/schemas/ClientSchema';
import { ClientRepository } from '../repository/ClientRepository';

export default async function  createClientSeed() {
  const clientRepository = new ClientRepository();
  const clientData = {
      _id: uuidv4(),
      name: 'Cliente 1',
      email: 'cliente1@example.com',
      password: 'senha123', 
      createdAt: new Date(),
    }

    
    const validate = clientRepository.findByEmail(clientData.email);
    if(validate != null){
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(clientData.password, salt);

    
    await ClientModel.create({
      clientData,
      password: hashedPassword, 
    });

    console.log(`Cliente ${clientData.name} criado com sucesso!`);
  }

createClientSeed().catch((err) => console.error('Erro ao criar clientes:', err));
