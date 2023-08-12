import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image";
const Avatar = () => {
  return (
    <>
      <div className="flex  flex-col mx-20 ">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 font-title ">
              Upperwear
            </CardTitle>
            <CardContent>
              <Image
                src="data:image/jpeg;base64,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"
                width={50}
                height={50}
              />{" "}
               <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 font-title">
              Bottomwear
            </CardTitle>
            <CardContent></CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 font-title">Shoes</CardTitle>
            <CardContent></CardContent>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Avatar;
