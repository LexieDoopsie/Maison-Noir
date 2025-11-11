import mongoose, { Schema, Document } from 'mongoose';

export interface IServer extends Document {
  name: string;
  description?: string;
  icon?: string;
  ownerId: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  channels: mongoose.Types.ObjectId[];
  inviteCode: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServerSchema = new Schema<IServer>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    icon: {
      type: String,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    channels: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
      },
    ],
    inviteCode: {
      type: String,
      required: true,
      unique: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ServerSchema.index({ inviteCode: 1 });
ServerSchema.index({ ownerId: 1 });

export default mongoose.model<IServer>('Server', ServerSchema);

