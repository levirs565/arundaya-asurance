import { forwardRef } from "react";
import { Day, dayEnums } from "@client/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function DaySelect({ onDaySelect, value, defaultValue }: { onDaySelect: (day: Day) => void, value: Day, defaultValue?: Day }) {
    return <Select value={value} onValueChange={onDaySelect} defaultValue={defaultValue}>
        <SelectTrigger>
            <SelectValue placeholder="Pilih Hari"></SelectValue>
        </SelectTrigger>
        <SelectContent>
            {dayEnums.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}
        </SelectContent>
    </Select>
}