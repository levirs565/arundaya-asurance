import * as React from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import { ChevronProps, DayPicker } from "react-day-picker"

import { cn } from "@client/lib/utils"
import { buttonVariants } from "@client/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const navButtonBaseClass = [
  buttonVariants({ variant: "outline" }),
  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
];

const chevronIconProps = {
  className: "w-4 h-3"
};
const chevronIcons: Record<Required<ChevronProps>["orientation"], any> = {
  down: <ChevronDown {...chevronIconProps} />,
  up: <ChevronUp {...chevronIconProps} />,
  left: <ChevronLeft {...chevronIconProps} />,
  right: <ChevronRight {...chevronIconProps} />
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        button_previous: cn(navButtonBaseClass, "absolute left-1"),
        button_next: cn(navButtonBaseClass, "absolute right-1"),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-zinc-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-zinc-400",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-zinc-100/50 [&:has([aria-selected])]:bg-zinc-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-zinc-800/50 dark:[&:has([aria-selected])]:bg-zinc-800",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        range_end: "day-range-end",
        selected: "*:bg-zinc-900 *:text-zinc-50 *:hover:bg-zinc-900 *:hover:text-zinc-50 *:focus:bg-zinc-900 *:focus:text-zinc-50 *:dark:bg-zinc-50 *:dark:text-zinc-900 *:dark:hover:bg-zinc-50 *:dark:hover:text-zinc-900 *:dark:focus:bg-zinc-50 *:dark:focus:text-zinc-900",
        today: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
        outside:
          "day-outside text-zinc-500 aria-selected:bg-zinc-100/50 aria-selected:text-zinc-500 dark:text-zinc-400 dark:aria-selected:bg-zinc-800/50 dark:aria-selected:text-zinc-400",
        disabled: "text-zinc-500 opacity-50 dark:text-zinc-400",
        range_middle:
          "aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50",
        hidden: "invisible",
        dropdowns: "flex flex-row gap-1",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => orientation ? chevronIcons[orientation] : <div>Undefined Icon</div>,
        Dropdown: ({ options, value, defaultValue, onChange, dir, ...props }) => <Select
          {...props}
          onValueChange={(value) => {
            onChange && onChange({
              target: { value }
            } as any)
          }}
          value={String(value)}
          defaultValue={String(value)}
        >
          <SelectTrigger className="border-none focus:ring-0 focus:ring-transparent">
            <SelectValue></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options?.map(({ label, value, disabled }) =>
              <SelectItem key={value} value={String(value)} disabled={disabled}>{label}</SelectItem>)}
          </SelectContent>
        </Select>,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
