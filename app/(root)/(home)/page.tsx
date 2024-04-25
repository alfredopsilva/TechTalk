import LocalSearchbar from "@/components/shared/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/contants/filters";
import Link from "next/link";
import React from "react";
import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";

const questions = [
    {
        _id: 1,
        title: "How does TypeScript improve JavaScript code?",
        tags: [
            { _id: 101, name: "JavaScript" },
            { _id: 102, name: "TypeScript" },
            { _id: 103, name: "Programming" },
        ],
        author: {
            _id: "a1",
            name: "John Doe",
            picture: "https://example.com/path/to/picture.jpg",
        },
        upvotes: 150,
        views: 120000,
        answers: [
            {
                text: "TypeScript adds static types and provides better tooling.",
                authorId: "a2",
            },
            {
                text: "It helps catch errors early during the development phase.",
                authorId: "a3",
            },
        ],
        createdAt: new Date("2024-01-10"),
    },
    {
        _id: 2,
        title: "What are the benefits of using async/await in JavaScript?",
        tags: [
            { id: 104, name: "Async" },
            { id: 105, name: "Await" },
            { id: 106, name: "JavaScript" },
        ],
        author: {
            _id: "b1",
            name: "Jane Smith",
            picture: "https://example.com/path/to/anotherpicture.jpg",
        },
        upvotes: 95,
        views: 800,
        answers: [
            {
                text: "Async/await simplifies the code and makes it more readable.",
                authorId: "b2",
            },
            {
                text: "It helps manage promises more efficiently.",
                authorId: "b3",
            },
        ],
        createdAt: new Date("2023-02-15"),
    },
];

const Home = () => {
    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">
                    All To Questions
                </h1>

                <Link
                    href={"/ask-question"}
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
                    questions.map((question, index) => (
                        <div key={index}>
                            <QuestionCard
                                key={question._id}
                                _id={question._id}
                                title={question.title}
                                // TODO: Check this type error
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
        </>
    );
};

export default Home;
