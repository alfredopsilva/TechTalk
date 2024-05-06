"use server";

import Interaction from "../database/interaction.model";
import Question from "../database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";

export async function viewQuestions(params: ViewQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, userId } = params;
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (existingInteraction) return console.log("User Has already viewed");

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error Processing viewQuestions");
  }
}
