import { Client } from "../../../domain/entities/Client";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { ClientMapper } from "../mongoDB/mapper/ClientMapper";
import { ClientModel } from "../mongoDB/schemas/ClientSchema";

export class ClientRepository implements IClientRepository {
  async findById(id: string): Promise<Client> {
    try {
      const client = await ClientModel.findById(id);
     return ClientMapper.toDomain(client);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar client");
    }
  }
  async findByEmail(email: string): Promise<Client>{
  const clientDoc =  await ClientModel.findOne({email}).exec();
    if(!clientDoc)throw new Error('cliente não encontrado');
    return ClientMapper.toDomain(clientDoc);
  }
 async  create(client: Client): Promise<void> {
    const email = client.props.email;
    const existe =  await ClientModel.findOne({email}).exec();
    if(existe){
      throw new Error('email duplicado');
    }
    ClientModel.create(ClientMapper.toPersistence(client));
  }
  
}