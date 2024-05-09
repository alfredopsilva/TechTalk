import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/LocalSearchbar";
import NoResult from "@/components/shared/NoResult";
import { TagFilters } from "@/contants/filters";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { Question } from "@/lib/database/question.model";
import { URLProps } from "@/types";
import React from "react";

const page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          placeholder="Search tag questions..."
          otherClasses="flex-1"
          imgSrc="/assets/icons/search.svg"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {/* TODO: Fix this type error; */}
        {result && result.questions.length > 0 ? (
          result.questions.map((question: Question, index) => (
            <div key={index}>
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            </div>
          ))
        ) : (
          <NoResult
            title={"There is no Tag Questions to Show"}
            description={
              "🚀 It looks like you haven't saved any questions yet! 📝 Find topics that pique your interest and start saving. Your favorite queries could inspire new insights and ideas. Start exploring and save your first question now! 💡"
            }
            link={"/"}
            linkTitle={"Save a Question"}
          />
        )}
      </div>
    </>
  );
};

export default page;
