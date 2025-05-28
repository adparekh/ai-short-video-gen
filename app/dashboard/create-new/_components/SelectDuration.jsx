"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectDuration({ onUserSelect }) {
  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Duration</h2>
      <p className="text-gray-500">Choose your video duration</p>
      <Select
        onValueChange={(value) => {
          onUserSelect("duration", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Duration Length" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="15 Seconds" key={1}>
            15 Seconds
          </SelectItem>
          <SelectItem value="30 Seconds" key={2}>
            30 Seconds
          </SelectItem>
          <SelectItem value="60 Seconds" key={3}>
            60 Seconds
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectDuration;
