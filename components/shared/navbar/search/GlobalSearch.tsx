"use client";
import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface CustomInputProps {
    route: string;
    iconPosition: string;
    imgSrc: string;
    placeholder: string;
    otherClasses: string;
}

const GlobalSearch = ({
    route,
    iconPosition,
    imgSrc,
    placeholder,
    otherClasses,
}: CustomInputProps) => {
    return (
        // TODO: Set a max width for this compoenent;
        <div
            className={`background-light800_darkgradient relative  flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
        >
            {iconPosition === "left" && (
                <Image
                    src={imgSrc}
                    alt="search"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                />
            )}
            <Input
                className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
                type="text"
                value={""}
                onChange={() => {}}
                placeholder={placeholder}
            />
            {iconPosition === "right" && (
                <Image
                    src={imgSrc}
                    alt="search"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                />
            )}
        </div>
    );
};

export default GlobalSearch;
