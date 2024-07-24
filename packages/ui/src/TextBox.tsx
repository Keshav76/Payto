"use client";

import { HTMLInputTypeAttribute, useId } from "react";

interface TextBoxProps {
  placeholder: string;
  changeHandler: (value: any) => void;
  label: string;
  type: HTMLInputTypeAttribute;
}

const TextBox = ({ placeholder, changeHandler, label, type }: TextBoxProps) => {
  const textBoxInputId = useId();
  return (
    <div className="pt-2">
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor={textBoxInputId}
      >
        {label}
      </label>
      <input
        required
        id={textBoxInputId}
        onChange={(e) => changeHandler(e.target.value)}
        type={type}
        min={1}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextBox;
