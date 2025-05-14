
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { IHashService } from '../../../domain/types/IHashSaved';
import { generateToken } from '../../../infra/jwt/jwt';
import bcrypt from 'bcryptjs';
export class AuthDto {
  email: string;
  password: string;

  constructor( email: string,password: string,) {
    this.email = email;
    this.password = password;
    
   
  }
}
export class AuthUseCase {
  constructor(private clientRepository: IClientRepository,private hashService : IHashService) {}

  
  async execute(auth: AuthDto){
    const existingUser = await this.clientRepository.findByEmail(auth.email);
    if(!existingUser){
      return new Error('Client Not Found');
    }
    const validatePassword = await this.hashService.compare(auth.password.trim(),existingUser.password);
    
    if(!validatePassword){
      return new Error("Password Not Correspondent")
    }
    return generateToken(existingUser)
  }
}