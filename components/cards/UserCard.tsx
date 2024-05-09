import { getAllTags, getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

interface UserCardProps {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: UserCardProps) => {
  const allTags = await getAllTags({});

  return (
    <Link
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
      href={`/profile/${user.clerkId}`}
    >
      <article className="background-light9000_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="User Profile Picture"
          width={100}
          height={100}
          className="rounded-full"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
        <div className="mt-5">
          {allTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {allTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No Tags Yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
