import { IClientRepository } from "../../../domain/repositories/IClientRepository";

class ClienteRepository implements IClientRepository {
  create(client: Client): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}