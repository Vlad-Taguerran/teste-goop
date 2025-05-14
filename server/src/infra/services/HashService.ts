import bcrypt from "bcryptjs";
import { IHashService } from "../../domain/types/IHashSaved";

export class HashService implements IHashService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}