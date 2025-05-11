export interface IClientRepository{
  create(client:Client): Promise<void>
}