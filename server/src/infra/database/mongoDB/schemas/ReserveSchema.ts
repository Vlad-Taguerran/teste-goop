import { Schema, model, Document } from 'mongoose';

export interface ReserveDocument extends Document {
  orderId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  completed: boolean;
  createdAt: Date;
  expiresAt: Date;
}

const ReserveSchema = new Schema<ReserveDocument>({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 15 * 60 * 1000),
  },
  completed: { type: Boolean, default: false },
});

// Índice para expiração automática (opcional)
ReserveSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 } as any);

export const ReserveModel = model<ReserveDocument>('Reserve', ReserveSchema);
