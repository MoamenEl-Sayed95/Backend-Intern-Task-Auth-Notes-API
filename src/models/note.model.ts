import mongoose, { Schema, Document, Types } from 'mongoose'

export interface INote extends Document {
  title: string
  content?: string
  tags?: string[]
  isDeleted: boolean
  userId: string | Types.ObjectId
  createdAt: Date
  updatedAt: Date
};

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String },
    tags: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model<INote>('Note', noteSchema);