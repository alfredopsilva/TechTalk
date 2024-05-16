"use client";
import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { AnswerSchema } from "@/lib/validations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";

interface AnswerProps {
  questionId: string;
  authorId: string;
  question: string;
}

const Answer = ({ questionId, authorId, question }: AnswerProps) => {
  const pathname = usePathname();
  const { mode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAi, setIsSubmittingAi] = useState(false);
  console.log(mode);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });
  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);

    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (error) {}
  };
  const editorRef = useRef<any>(null);

  const generateAiAnswer = async () => {
    if (!authorId) return;
    setIsSubmittingAi(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        { method: "POST", body: JSON.stringify({ question }) },
      );

      const aiAnswer = await response.json();
      const formatedAiAnswer = aiAnswer.reply.replace(/\n/g, "<br />");
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formatedAiAnswer);
      }

      // TODO: Add a toast notification
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmittingAi(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h3 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h3>
        <Button
          onClick={generateAiAnswer}
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
        >
          <Image
            src={"/assets/icons/stars.svg"}
            alt={"AI Icon"}
            width={12}
            height={12}
            className={"object-contain"}
          />
          {isSubmittingAi ? "Generating..." : "Generate AI Answer"}
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormControl className="mt-3.5">
                  {/* TODO: Add and Editor component */}
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    initialValue=""
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className={`primary-gradient w-fit text-white`}
              disabled={isSubmitting}
            >
              {/* FIXME: Fix this logic */}
              Submit
              {/* {isSubmitting ? (
        
                        <>
                            {type === "edit" ? " Editing" : "Posting"} 
                        </>
                    ) : (
                        <>
                            {type === "create" ? "Edit Question" : " Ask a Question"}
                        </>
                    )} */}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
