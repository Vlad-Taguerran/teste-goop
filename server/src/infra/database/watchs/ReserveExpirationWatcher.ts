import mongoose from 'mongoose';
import { ProductModel } from '../mongoDB/schemas/ProductSchema';
import { ReserveModel } from '../mongoDB/schemas/ReserveSchema';


export const startReserveWatcher = async () => {
  const db = mongoose.connection;

  try {
    await db.db.command({
      collMod: 'reserves',
      changeStreamPreAndPostImages: { enabled: true },
    });
    console.log('[✓] changeStreamPreAndPostImages ativado para a coleção "reserves"');
  } catch (err:any) {
    console.warn('[!] Falha ao ativar preImage. Talvez já esteja habilitado:', err.message);
  }

  const changeStream = ReserveModel.watch([], {
    fullDocument: 'default',
    fullDocumentBeforeChange: 'required',
  });

  changeStream.on('change', async (change) => {
    if (change.operationType === 'delete') {
      const deletedId = change.documentKey._id.toString();
      const deletedDoc = change.fullDocumentBeforeChange;

      if (!deletedDoc) {
        console.warn(`[!] PreImage não disponível para a reserva ${deletedId}`);
        return;
      }

      if (deletedDoc.completed) {
        console.log(`[✓] Reserva ${deletedId} foi concluída. Nenhuma ação necessária.`);
        return;
      }

      for (const item of deletedDoc.items) {
        await ProductModel.updateOne(
          { _id: item.productId },
          { $inc: { reservedQuantity: -item.quantity } }
        );
        console.log(`Revertido estoque: ${item.quantity}x ${item.productId}`);
      }

      console.log(`stoque revertido com sucesso para reserva expirada ${deletedId}`);
    }
  });

  changeStream.on('error', (err) => {
    console.error('Erro no Change Stream:', err);
  });

  console.log('[🔄] Watcher de reservas iniciado...');
};
