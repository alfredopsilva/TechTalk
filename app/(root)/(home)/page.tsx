import LocalSearchbar from "@/components/shared/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/contants/filters";
import Link from "next/link";
import React from "react";
import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/home/HomeFilters";
import Card from "@/components/home/Card";
import NoResult from "@/components/shared/NoResult";

const questions = [
    // {
    //     _id: 1,
    //     title: "Cascading Deletes in SQLAlchemy?",
    //     tags: [
    //         { _id: 1, name: "python" },
    //         { _id: 2, name: "MySQL" },
    //         { _id: 3, name: "Java" },
    //     ],
    //     author: "John Doe",
    //     upvotes: 10,
    //     views: 100,
    //     answers: 2,
    //     createdAt: "2021-09-01T12:00:00.000z",
    // },
    // {
    //     _id: 1,
    //     title: "Cascading Deletes in SQLAlchemy?",
    //     tags: [
    //         { _id: 1, name: "python" },
    //         { _id: 2, name: "MySQL" },
    //         { _id: 3, name: "Java" },
    //     ],
    //     author: "John Doe",
    //     upvotes: 10,
    //     views: 100,
    //     answers: 2,
    //     createdAt: "2021-09-01T12:00:00.000z",
    // },
];

const Home = () => {
    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">
                    All To Questions
                </h1>

                <Link
                    href={"/askquestion"}
                    className="flex justify-end max-sm:w-full"
                >
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
                {questions.length > 0 ? (
                    questions.map((question) => <Card question={question} />)
                ) : (
                    <NoResult />
                )}
            </div>
        </>
    );
};

export default Home;
