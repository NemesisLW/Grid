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
import Combobox from "./Combobox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useChat } from "ai/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { Mic } from "lucide-react";

const Chat = ({ products, setProduct }) => {
  // Streaming AI Primary Response
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat();

  // Voice Recognition
  const [transcribing, setTranscribing] = useState(true);
  const [clearTranscriptOnListen, setClearTranscriptOnListen] = useState(true);
  const toggleTranscribing = () => setTranscribing(!transcribing);
  const toggleClearTranscriptOnListen = () =>
    setClearTranscriptOnListen(!clearTranscriptOnListen);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({ transcribing, clearTranscriptOnListen });

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser does not support speech recognition.</span>;
    }
    if (!isMicrophoneAvailable) {
      return <span>Please allow access to the microphone</span>;
    }
    SpeechRecognition.startListening({ continuous: true });
  };
  useEffect(() => {
    if (interimTranscript !== "") {
      console.log("Got interim result:", interimTranscript);
    }
    if (finalTranscript !== "") {
      setInput(finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);

  // Get the Latest Request by the User to initiate Search
  const latestUserReq = messages
    .slice()
    .reverse()
    .find((message) => message.role === "user")?.content;

  useEffect(() => {
    useStore.setState({ currentRequest: latestUserReq });
  }, [latestUserReq]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (product) => {
    setSelectedImage(product);
    setProduct(product);
  };

  // Suggested queries
  const [selectedQuery, setSelectedQuery] = useState("");

  const handleQuerySelect = (selectedValue) => {
    setSelectedQuery(selectedValue);
    setInput(selectedValue);
  };

  return (
    <Card className="w-[500px] mt-3">
      <CardHeader>
        <CardTitle className="text-blue-600 font-title">
          Outfit Generator
        </CardTitle>
        <CardDescription>
          Get your hand-picked customisations...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full pr-4">
          {messages.map((message) => {
            return (
              <div key={message.id} className="flex flex-col">
                <div className="flex gap-3 text-slate-600 text-sm mb-4">
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

                <div>
                  {message.role === "assistant" && (
                    <div className="flex ">
                      {products.slice(0, 4).map((product) => (
                        <div
                          key={product.image_src}
                          className={`image-container ${
                            selectedImage === product ? "selected" : ""
                          }`}
                          onClick={() => handleImageClick(product)}
                        >
                          <Image
                            alt=""
                            src={product.image_src}
                            width={100}
                            height={100}
                          />
                          {selectedImage === product && (
                            <div className="tick-mark">&#10003;</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex flex-row w-full justify-between">
          <Combobox
            selectedQuery={selectedQuery}
            onQuerySelect={handleQuerySelect}
          />
        </div>
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
          <Button
            variant="mic"
            onTouchStart={startListening}
            onMouseDown={startListening}
            onTouchEnd={SpeechRecognition.stopListening}
            onMouseUp={SpeechRecognition.stopListening}
            className={listening ? "bg-blue-800" : "bg-blue-600"}
          >
            <Mic />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chat;
