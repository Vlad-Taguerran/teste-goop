
module.exports = {
  async up(db) {
    await db.collection('products').updateMany(
      { reservedQuantity: { $exists: false } },
      { $set: { reservedQuantity: 0 } }
    );
  },

  async down(db) {
    await db.collection('products').updateMany(
      {},
      { $unset: { reservedQuantity: "" } }
    );
  }
};