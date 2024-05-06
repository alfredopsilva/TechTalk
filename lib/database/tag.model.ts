import { Schema, model, models, Document, Model } from "mongoose";

export interface TagDocument extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

export type TagModel = Model<TagDocument>;

const tagSchema = new Schema<TagDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now },
});

const Tag: TagModel = models.Tag || model<TagDocument>("Tag", tagSchema);

export default Tag;
