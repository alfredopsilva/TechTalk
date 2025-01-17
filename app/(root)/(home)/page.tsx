import LocalSearchbar from "@/components/shared/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/contants/filters";
import Link from "next/link";
import React from "react";
import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";

const Home = async ({ searchParams }: SearchParamsProps) => {
  const result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All To Questions</h1>

        <Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          placeholder="Search questions..."
          otherClasses="flex-1"
          imgSrc="/assets/icons/search.svg"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
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
            title={"There is no Question to Show"}
            description={
              "Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Your query could be the next big thing others learn from. Get involved! 💡"
            }
            link={"/ask-question"}
            linkTitle={"Ask a Question"}
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Home;
