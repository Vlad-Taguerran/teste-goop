class Client {

  constructor(public readonly props: ClientProps, public readonly id?: string) 
  {
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