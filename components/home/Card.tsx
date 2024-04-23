import React from "react";
import RenderTag from "../shared/RenderTag";
import { Tag } from "@/types";

interface CardProps {
    question: {
        _id: number;
        title: string;
        tags: [{ _id: number; name: string }];
        author: string;
        upvotes: number;
        views: number;
        answers: number;
        createdAt: Date;
    };
}

const Card = ({ question }: CardProps) => {
    return (
        <div className="background-light900_dark300 shadow-light100_dark100 px-11 py-9 ">
            <h1 className="h3-semibold">{question.title}</h1>
        </div>
    );
};

export default Card;
