import { Schema, model, models, Document, Model } from "mongoose";

export interface InteractionDocument extends Document {
  user: Schema.Types.ObjectId; // references to user
  action: string;
  question: Schema.Types.ObjectId; // References to Question
  answer: Schema.Types.ObjectId; // References to Asnwer
  tags: Schema.Types.ObjectId[]; // References to Tag
  createdAt: Date;
}

export type InteractionType = Model<InteractionDocument>;

const interactionSchema = new Schema<InteractionDocument>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now() },
});

const Interaction: InteractionType =
  models.Interaction || model("Interaction", interactionSchema);

export default Interaction;
