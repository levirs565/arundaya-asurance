"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@client/components/ui/label";
import { TimePickerInput } from "./time-picker-input";

interface TimePicker24 {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  name: string
}

export function TimePicker24({ name, date, setDate }: TimePicker24) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="hours"
          id={name + "-hours"}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
        <Label htmlFor={name + "-hours"} className="text-xs">
          Jam
        </Label>
      </div>
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="minutes"
          id={name + "minutes"}
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
        <Label htmlFor={name + "minutes"} className="text-xs">
          Menit
        </Label>
      </div>
      <div className="flex mt-4 self-start items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}