import { Schema, model, models, Document } from "mongoose";

export interface Tag extends Document {
    name: string;
    description: string;
    questions: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    createdOn: Date;
}

const tagSchema = new Schema<Tag>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdOn: { type: Date, default: Date.now },
});

const Tag = models.Tag || model("Tag", tagSchema);

export default Tag;