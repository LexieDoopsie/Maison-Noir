import mongoose, { Schema, Document } from 'mongoose';

export interface IMessageReaction {
  emoji: string;
  users: mongoose.Types.ObjectId[];
}

export interface IMessage extends Document {
  channelId: mongoose.Types.ObjectId;
  serverId?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content: string;
  encrypted: boolean;
  reactions: IMessageReaction[];
  editedAt?: Date;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MessageReactionSchema = new Schema<IMessageReaction>({
  emoji: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const MessageSchema = new Schema<IMessage>(
  {
    channelId: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    serverId: {
      type: Schema.Types.ObjectId,
      ref: 'Server',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    encrypted: {
      type: Boolean,
      default: false,
    },
    reactions: [MessageReactionSchema],
    editedAt: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.index({ channelId: 1, createdAt: -1 });
MessageSchema.index({ userId: 1 });

export default mongoose.model<IMessage>('Message', MessageSchema);

