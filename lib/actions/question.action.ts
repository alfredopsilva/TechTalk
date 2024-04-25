"use server";

import Question from "../database/question.model";
import Tag from "../database/tag.model";
import { connectToDatabase } from "../mongoose";

export async function createQuestion(params: any) {
    try {
        connectToDatabase();
        const { title, content, tags, author, path } = params;

        //Creating Question
        const question = await Question.create({
            title,
            content,
            author,
        });
        const tagDocuments = [];
        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                {
                    $setOnInsert: { name: tag },
                    $push: { question: question._id },
                },
                { upsert: true, new: true }
            );
            tagDocuments.push(existingTag._id);
        }

        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagDocuments } },
        });

        //TODO: Create an Interaction record for the user's ask_question.
    } catch (error) {
        console.log(error);
    }
}
