/* eslint-disable tailwindcss/classnames-order */
import LeftSidebar from "@/components/LeftSidebar";
import NavBar from "@/components/shared/navbar/NavBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative background-light850_dark100">
            <NavBar />
            <div className="flex">
                <LeftSidebar />
                <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 ">
                    <div className="mx-auto w-full max-w-5xl">{children}</div>
                </section>
                RightSideBar
            </div>
        </main>
    );
};

export default layout;
