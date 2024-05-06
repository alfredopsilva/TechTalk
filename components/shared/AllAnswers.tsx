import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/contants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParsedHTML from "./ParsedHTML/ParsedHTML";
import Votes from "./Votes";

interface AllAnswersProps {
  questionId: string;
  // NOTE: maybe this author ID will make some bug, confirm later where this is comming from.
  authorId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}
const AllAnswers = async ({
  questionId,
  authorId,
  totalAnswers,
  page,
  filter,
}: AllAnswersProps) => {
  const result = await getAnswers({ questionId });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      {result.answers.map((answer) => (
        <article key={answer._id} className="light-border border-b py-10">
          <div className="flex items-center justify-between">
            {/* You might want to put some content here */}
            <div className="mb-8 w-full flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  alt="Profile Picture"
                  className="rounded-full object-cover max-sm:mt-0.5"
                  width={18}
                  height={18}
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700 me-1">
                    {answer.author.name}
                  </p>
                  <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                    <span className="max-sm:hidden"> - </span> answered{" "}
                    {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end">
                <Votes
                  type="answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(authorId)}
                  upVotes={answer.upvotes.length}
                  hasUpVoted={answer.upvotes.includes(authorId)}
                  downVotes={answer.downvotes.length}
                  hasDownVoted={answer.downvotes.includes(authorId)}
                />
              </div>
            </div>
          </div>
          <ParsedHTML data={answer.content} />
        </article>
      ))}
    </div>
  );
};

export default AllAnswers;
