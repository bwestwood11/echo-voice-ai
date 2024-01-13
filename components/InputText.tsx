"use client";

import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ImSpinner3 } from "react-icons/im";
import proModal from "./proModal";

type InputTextProps = {
  setText: (text: string) => void;
  text: string;
  characterCount: number;
  setCharacterCount: (characterCount: number) => void;
}

const InputText = ({setText, text, characterCount, setCharacterCount}: InputTextProps) => {

  const handleTextChange = (e: any) => {
    const newText = e.target.value;
    setCharacterCount(newText.length);
    setText(newText); // Update the state with the new text
    console.log("text", text);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative w-full">
        <Textarea
          className="bg-white border border-gray-300 rounded-md p-2 w-full h-[150px] pr-16" // Adjust padding-right to make space for character count
          value={text}
          onChange={handleTextChange}
          placeholder="Type your text here..."
        />
        <p className="absolute bottom-2 right-3 text-sm text-gray-600"> {/* Adjust bottom and right to position the count */}
          {characterCount}
        </p>
      </div>
    </div>
  );
};

export default InputText;
