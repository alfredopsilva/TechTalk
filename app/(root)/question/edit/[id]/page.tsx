import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  if (!mongoUser) return null;

  const result = await getQuestionById({ questionId: params.id });
  if (!result) return null;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Questions</h1>

      <div className="mt-9">
        <Question
          type={"edit"}
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default page;
