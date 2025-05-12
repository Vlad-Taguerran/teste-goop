import { readdirSync } from "fs";
import { join } from "path";
import { connectDatabase } from "./start";

async function runSeeds() {
  await connectDatabase();

  const seedPath = join(__dirname,'../seed');
  const seedFiles = readdirSync(seedPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of seedFiles) {
    console.log(`Executando seed: ${file}`);
    const seedModule = await import(join(seedPath, file));
    
    if (typeof seedModule.default === 'function') {
      await seedModule.default(); // se você usou export default
    } else if (typeof seedModule.createSeed === 'function') {
      await seedModule.createSeed(); // se usou export nomeado
    } else {
      console.warn(`Seed ${file} não exporta função executável.`);
    }
  }

  console.log('✅ Todas as seeds foram executadas com sucesso.');
  process.exit(0);
}

runSeeds().catch((err) => {
  console.error('Erro ao executar seeds:', err);
  process.exit(1);
});