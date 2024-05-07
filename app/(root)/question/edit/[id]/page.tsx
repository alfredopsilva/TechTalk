import { URLProps } from "@/types";
import React from "react";

const page = ({ params, searchParams }: URLProps) => {
  return <div>{params.id}</div>;
};

export default page;
