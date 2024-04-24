import React from "react";
import { Tag } from "@/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type RenderTagProps = {
    tag: Tag;
    showCount?: boolean;
};
const RenderTag = ({ tag, showCount }: RenderTagProps) => {
    return (
        <Link href={`/tags/${tag.id}`} className="flex justify-between gap-2">
            <Badge className="subtle-medium background-light800_dark300 text-light400_light500 flex min-w-24 items-center justify-center rounded-md border-none px-4 py-2 uppercase">
                {tag.name}
            </Badge>
            {showCount && (
                <p className="small-medium text-dark500_light700">
                    {tag.totalQuestions}
                </p>
            )}
        </Link>
    );
};

export default RenderTag;
