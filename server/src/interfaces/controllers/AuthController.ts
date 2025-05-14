import { AuthDto, AuthUseCase } from "../../application/usecase/auth/AuthUseCase";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { IHashService } from "../../domain/types/IHashSaved";
import { ClientRepository } from "../../infra/database/repository/ClientRepository";
import { Request, Response } from 'express'


export class AuthController {
private authUseCase : AuthUseCase;

  constructor(private clientRepository: IClientRepository,
    private hashService: IHashService
  ) {
    this.authUseCase = new AuthUseCase(this.clientRepository,this.hashService);
  }
    async loging(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).json('Formulario vazio');
      }
      const { password, email } = req.body;
      const response = await this.authUseCase.execute(new AuthDto(email, password))
      if (!response) {
        return res.status(404).json('Usuario não encontrado');
      }
      return res.status(200).json({'token':response});
    } catch (error) {
      return res.status(500).json('Erro no servidor')
    }
  }

}