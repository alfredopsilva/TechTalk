import TagCard from "@/components/cards/TagCard";
import UserCard from "@/components/cards/UserCard";
import LocalSearchbar from "@/components/shared/LocalSearchbar";
import NoResult from "@/components/shared/NoResult";
import { UserFilters } from "@/contants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { Filter, Link } from "lucide-react";
import React from "react";

const page = async () => {
    const result = await getAllTags({});

    return (
        <>
            <h1 className="h1-bold text-dark100_light900">All Users</h1>

            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchbar
                    route="/"
                    iconPosition="left"
                    placeholder="Search for revolutionary minds."
                    otherClasses="flex-1"
                    imgSrc="/assets/icons/search.svg"
                />
                <Filter
                    filters={UserFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                    containerClasses=""
                />
            </div>

            <section className="mt-12 flex flex-wrap gap-4">
                {/* FIXME: Is not couting questions that has this tags. */}
                {result.tags.length > 0 ? (
                    result.tags.map((tag) => (
                        <TagCard
                            key={tag._id}
                            _id={tag._id}
                            name={tag.name}
                            length={tag.questions.length}
                        />
                    ))
                ) : (
                    <NoResult
                        title="No Tags Found"
                        description="It looks like there are no tags found"
                        link="/ask-question"
                        linkTitle="Ask a Question"
                    />
                )}
            </section>
        </>
    );
};

export default page;
