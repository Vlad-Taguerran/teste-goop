module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    const collectionExists = await db.listCollections({ name: 'reserves' }).hasNext();

  if (!collectionExists) {
    // Cria a coleção com um documento dummy
    await db.collection('reserves').insertOne({
      orderId: 'placeholder',
      items: [],
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
    await db.collection('reserves').deleteOne({ orderId: 'placeholder' });
    console.log('[✓] Coleção "reserves" criada.');
  }

  // Habilita preImage
  await db.command({
    collMod: 'reserves',
    changeStreamPreAndPostImages: { enabled: true },
  });

  console.log('[✓] preImage habilitado na coleção "reserves".');
  },

  async down(db, client) {
    await db.command({
    collMod: 'reserves',
    changeStreamPreAndPostImages: { enabled: false },
  });

  console.log('[↩] preImage desabilitado na coleção "reserves".');
  }
};
