import { Client } from "../../../../domain/entities/Client";

export class ClientMapper {
  static toPersistence(client: Client) {
    return {
      _id: client.id,
      name: client.props.name,
      email: client.props.email,
      password: client.props.password,
      createdAt: client.props.createdAt,
    };
  }

  static toDomain(raw: any): Client {
    return new Client(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
      },
      raw._id
    );
  }

  static toDTO(client: Client) {
    return {
      id: client.id,
      name: client.props.name,
      email: client.props.email,
      createdAt: client.props.createdAt,
    };
  }
}