"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";

import { useChat } from "ai/react";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  

  return (
    <Card className="w-[400px] mt-3">
      <CardHeader>
        <CardTitle className="text-blue-600 font-title">
          Outfit Generator
        </CardTitle>
        <CardDescription>
          Get your hand-picked customisations...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className="flex gap-3 text-slate-600 text-sm mb-4"
              >
                {message.role == "user" && (
                  <Avatar>
                    <AvatarFallback></AvatarFallback>
                    <AvatarImage src="https://github.com/NemesisLW.png" />
                  </Avatar>
                )}
                {message.role == "assistant" && (
                  <Avatar>
                    <AvatarFallback></AvatarFallback>
                    <AvatarImage src="https://learnprogramo.com/wp-content/uploads/2022/05/cute-girl-pfp-1.jpg?ezimgfmt=rs:352x352/rscb2/ngcb2/notWebP" />
                  </Avatar>
                )}

                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-800">
                    {message.role === "user" ? "You" : "Assistant"}
                  </span>
                  {message.content}
                </p>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <form className="space-x-2 w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="Don't like something? let me find something else for you.."
            value={input}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50"
          >
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chat;
