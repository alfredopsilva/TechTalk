import Link from "next/link";
import React from "react";
import { HealthApiRequestFactory } from "svix/dist/openapi/apis/HealthApi";

interface TagCardProps {
    _id: string;
    name: string;
    length: number;
}

const TagCard = ({ _id, name, length }: TagCardProps) => {
    return (
        <Link
            href={`/tags/${_id}`}
            key={_id}
            className="shadow-light100_darknone"
        >
            <article className="background-light900_dark200 light-border w-full flex flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                    <p className="paragraph-semibold text-dark300_light900">
                        {name}
                    </p>
                </div>
                <p className="small-medium text-dark400_light500 mt-3.5">
                    <span className="body-semibold primary-text-gradient mt-2.5">
                        {length}+
                    </span>{" "}
                    Questions
                </p>
            </article>
        </Link>
    );
};

export default TagCard;
