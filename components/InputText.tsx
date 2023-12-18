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
    <div className="w-[95%] flex flex-col gap-2">
        <Textarea
        className="bg-white border border-gray-300 rounded-md p-2 w-full h-[150px]"
        value={text}
        onChange={handleTextChange}
        placeholder="Type your text here..."
      />
      <p>
        {/* Character Count: {voice.length}/200 */}
        Character Count: {characterCount}
      </p>
    </div>
  );
};

export default InputText;
