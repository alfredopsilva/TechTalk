import Answer from "@/components/forms/Answer";
import Metric from "@/components/shared/Metric";
import ParsedHTML from "@/components/shared/ParsedHTML/ParsedHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams, params }) => {
    const result = await getQuestionById({ questionId: params.id });

    return (
        <>
            <div className="flex-start w-full flex-col">
                <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                    <Link
                        href={`/profile/${result.author.clerkId}`}
                        className="flex items-center justify-start gap-2"
                    >
                        <Image
                            src={result.author.picture}
                            alt={`Question made by ${result.author.name}`}
                            width={22}
                            height={22}
                            className="rounded-full"
                        />
                        <p className="paragraph-semibold text-dark300_light700">
                            {result.author.name}
                        </p>
                    </Link>
                    <div className="flex justify-end">VOTING</div>
                </div>
                <h2 className="h2-semibold text-dark200_light900 mt-3.5">
                    {result.title}
                </h2>
            </div>

            <div className="mb-8 mt-5 flex flex-wrap gap-4">
                <Metric
                    imgUrl="/assets/icons/clock.svg"
                    alt="upvotes"
                    value={` asked ${getTimestamp(result.createdAt)}`}
                    title="Asked"
                    textStyles="small-medium text-dark400_light800"
                />
                <Metric
                    imgUrl="/assets/icons/message.svg"
                    alt="Answers"
                    value={formatAndDivideNumber(result.answers.length)}
                    title="Votes"
                    textStyles="small-medium text-dark400_light800"
                />
                <Metric
                    imgUrl="/assets/icons/eye.svg"
                    alt="Views"
                    value={formatAndDivideNumber(result.views)}
                    title="Views"
                    textStyles="small-medium text-dark400_light800"
                />
            </div>

            <ParsedHTML data={result.content} />

            <div className="mt-7 flex flex-wrap gap-2">
                {result.tags.map((tag) => (
                    <RenderTag
                        key={tag._id}
                        name={tag.name}
                        showCount={false}
                        id={tag._id}
                    />
                ))}
            </div>

            <Answer />
        </>
    );
};

export default page;
