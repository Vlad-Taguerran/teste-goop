import { ClientProps } from "../types/ClientProps";

export class Client {
public name: string;
public email: string;
public password: string
  constructor(public readonly props: ClientProps, public readonly id: string) 
  {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password
    this.validate();
  }
   private validate() {
    if (!this.props.name || this.props.name.length < 3) {
      throw new Error('Nome deve ter pelo menos 3 caracteres');
    }

    if (!this.props.email.includes('@')) {
      throw new Error('Email inválido');
    }
  }
}