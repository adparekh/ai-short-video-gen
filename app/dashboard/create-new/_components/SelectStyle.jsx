import Image from "next/image";
import React, { useState } from "react";

function SelectStyle({ onUserSelect }) {
  const options = [
    {
      name: "Animated",
      image: "/anime.jpg",
    },
    {
      name: "Cartoon",
      image: "/cartoon.png",
    },
    {
      name: "Comic",
      image: "/comic.jpg",
    },
    {
      name: "Realistic",
      image: "/real.jpg",
    },
    {
      name: "Watercolor",
      image: "/watercolor.jpg",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Choose your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {options.map((option, index) => (
          <div
            key={index}
            className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl duration-200 ease-in-out
            ${selectedOption == option.name && "border-4 border-primary"}
          `}
          >
            <Image
              src={option.image}
              alt={option.name}
              width={100}
              height={100}
              className="h-48 object-cover rounded-lg w-full"
              onClick={() => {
                setSelectedOption(option.name);
                onUserSelect("style", option.name);
              }}
            />
            <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">
              {option.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
