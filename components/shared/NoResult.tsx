import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const NoResult = () => {
    return (
        <div className="mt-10 flex w-full flex-col items-center justify-center">
            <Image
                src={"/assets/images/light-illustration.png"}
                alt="No result illustration"
                width={270}
                height={200}
                className="block object-contain dark:hidden"
            />

            <Image
                src={"/assets/images/dark-illustration.png"}
                alt="No result illustration"
                width={270}
                height={200}
                className=" hidden object-contain dark:block"
            />
            <h2 className="h2-bold text-dark200_light900">
                There's no question to show
            </h2>
            <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
                Be the first to break the silence! 🚀 Ask a Question and
                kickstart the discussion. our query could be the next big thing
                others learn from. Get involved! 💡
            </p>
            <Link href="/askquestion">
                <Button>Ask Question</Button>
            </Link>
        </div>
    );
};

export default NoResult;
