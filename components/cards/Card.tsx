import React from "react";

interface CardProps {
    question: {
        _id: number;
        title: string;
        tags: { _id: number; name: string }[];
        author: { _id: string; name: string; picture: string };
        upvotes: number;
        views: number;
        answers: Array<object>;
        createdAt: Date;
    };
}

const Card = ({ question }: CardProps) => {
    return (
        <div
            className="card-wrapper rounded-[10px] p-9 sm:px-11 "
            key={question._id}
        >
            <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                <div>
                    <span className="subtle-regular text-dark-400_light700 line-clamp-1 flex  sm:hidden">
                        {String(question.createdAt)}
                    </span>
                </div>
                <h1 className="h3-semibold">{question.title}</h1>
            </div>
        </div>
    );
};

export default Card;
