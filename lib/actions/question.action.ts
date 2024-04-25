"use server";

import { revalidatePath } from "next/cache";
import Question from "../database/question.model";
import Tag from "../database/tag.model";
import User from "../database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";

export async function createQuestion(params: CreateQuestionParams) {
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
        revalidatePath(path);
    } catch (error) {
        console.log(error);
    }
}

export async function getQuestions(params: GetQuestionsParams) {
    try {
        connectToDatabase();
        const questions = await Question.find({})
            .populate({
                path: "tags",
                model: Tag,
            })
            .populate({
                path: "author",
                model: User,
            })
            .sort({
                createdAt: -1,
            });

        return { questions };
    } catch (error) {
        console.log(`Error while retrieving questions from DB : ${error}`);
    }
}