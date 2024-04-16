import { UserButton } from "@clerk/nextjs";
import React from "react";

const Home = () => {
    return (
        <div>
            <UserButton afterSignOutUrl="/" />
            <h1>HOME PAGE</h1>
        </div>
    );
};

export default Home;
