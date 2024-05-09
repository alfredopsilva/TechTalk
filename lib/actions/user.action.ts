"use server";
import { FilterQuery } from "mongoose";
import User, { UserDocument } from "../database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import console from "console";

import Tag from "../database/tag.model";
import Answer from "../database/answer.model";
import Question from "../database/question.model";

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    const { filter, searchQuery } = params;

    const query: FilterQuery<typeof User> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};
    /* eslint-disable */
    switch (filter) {
      case "new_users":
        sortOptions = { createdAt: -1 };
        break;
      case "old_users":
        sortOptions = { createdAt: 1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;
    }

    const users = await User.find(query).sort(sortOptions);
    return { users };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
}

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;
    console.log(updateData);
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) throw new Error("User not found!");

    const userQuestionsIds = await Answer.find({
      author: user._id,
    }).distinct("_id");

    await Answer.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deleteUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete user");
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();
    const { userId, questionId, path } = params;

    const user: UserDocument | null = await User.findById(userId);
    if (!user) throw new Error("User Not Found");

    // TODO: Fix this type error
    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true },
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId },
        },
        { new: true },
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Error occured to save question.");
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    const { clerkId, filter, searchQuery } = params;

    const query: FilterQuery<typeof Answer> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    /* eslint-disable */
    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: 0 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;
      default:
        sortOptions = { views: -1 };
        break;
    }

    const user = await User.findOne({ clerkId: clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) throw new Error("User Not Found");

    const savedQuestions = user.saved;

    return { questions: savedQuestions };
  } catch (error) {
    console.log(error);
    throw new Error("Error processing getSavedQuestions");
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not Found");

    const totalQuestions = await Answer.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });
    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log(error);
    throw new Error("Error processing getUserInfo");
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    const totalQuestions = await Question.countDocuments({
      author: userId,
    });

    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate("author", "_id clerkId name picture")
      .populate("tags", "_id name");

    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.log(error);
    throw new Error("Error Processing getUserQuestions");
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    const totalAnswers = await Answer.countDocuments({
      author: userId,
    });

    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate("author", "_id clerkId name picture")
      .populate("question", "_id title");

    return { totalAnswers, answers: userAnswers };
  } catch (error) {
    console.log(error);
    throw new Error("Error Processing getUserAnswers");
  }
}
