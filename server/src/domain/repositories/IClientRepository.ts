import { Client } from "../entities/Client";

export interface IClientRepository{
  create(client:Client): Promise<void>;
  findById(id:string): Promise<Client>;
}