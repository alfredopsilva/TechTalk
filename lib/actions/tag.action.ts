"use server";

import { connect } from "http2";
import User from "../database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "../database/tag.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
    try {
        connectToDatabase();
        const { userId, limit = 3 } = params;
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        return [
            { _id: "tag1", name: "tag1" },
            { _id: "tag2", name: "tag2" },
            { _id: "tag3", name: "tag3" },
        ];
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch tags");
    }
}

export async function getAllTags(params: GetAllTagsParams) {
    try {
        connectToDatabase();
        const tags = await Tag.find({});
        return { tags };
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch tags");
    }
}
