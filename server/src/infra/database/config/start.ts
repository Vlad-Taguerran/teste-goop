import mongoose from 'mongoose';
import { startReserveWatcher } from '../watchs/ReserveExpirationWatcher';


const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'goop';


export async function connectDatabase(): Promise<void> {
  const maxRetries = 5;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await mongoose.connect(mongoUri, {
        dbName,
        authSource: 'admin',
        serverSelectionTimeoutMS: 5000,
      });

      // Verifica se o MongoDB realmente respondeu
      await mongoose.connection.db.admin().ping();

      console.log('✅ MongoDB conectado com sucesso!');
      startReserveWatcher();
      break;
    } catch (error) {
      console.warn(`⚠️ Tentativa ${attempt} falhou: ${(error as Error).message}`);
      if (attempt === maxRetries) {
        console.error('❌ Não foi possível conectar ao MongoDB após várias tentativas.');
        process.exit(1);
      }

      // Espera 2 segundos antes de tentar novamente
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}