"use client";
import React, { useEffect } from "react";
import Prism from "prismjs";
import parse from "html-react-parser";
import "./prism.imports";

interface ParsedHTMLProps {
    data: string;
}

const ParsedHTML = ({ data }: ParsedHTMLProps) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return <div>{parse(data)}</div>;
};

export default ParsedHTML;
