import LocalSearchbar from "@/components/shared/LocalSearchbar";
import { QuestionFilters } from "@/contants/filters";
import React from "react";
import Filter from "@/components/shared/Filter";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { SearchParamsProps } from "@/types";

const Home = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          placeholder="Search questions..."
          otherClasses="flex-1"
          imgSrc="/assets/icons/search.svg"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {/* TODO: Fix this type error; */}
        {result && result.questions.length > 0 ? (
          result.questions.map((question, index) => (
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
            title={"There is no Saved Questions to Show"}
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

export default Home;
