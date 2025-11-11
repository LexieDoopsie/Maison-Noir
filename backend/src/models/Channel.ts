import mongoose, { Schema, Document } from 'mongoose';

export interface IChannel extends Document {
  serverId?: mongoose.Types.ObjectId;
  name: string;
  type: 'text' | 'voice' | 'dm';
  description?: string;
  members?: mongoose.Types.ObjectId[];
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChannelSchema = new Schema<IChannel>(
  {
    serverId: {
      type: Schema.Types.ObjectId,
      ref: 'Server',
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    type: {
      type: String,
      enum: ['text', 'voice', 'dm'],
      default: 'text',
    },
    description: {
      type: String,
      maxlength: 500,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    lastMessageAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

ChannelSchema.index({ serverId: 1 });
ChannelSchema.index({ type: 1 });

export default mongoose.model<IChannel>('Channel', ChannelSchema);

