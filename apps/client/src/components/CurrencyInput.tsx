import { ForwardedRef, forwardRef } from "react";
import { Input } from "./ui/input";

function removeNonDigit(value: string) {
    return value.replace(/\D/g, '');
}

function formatNumberWithDots(value: string) {
    return removeNonDigit(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const CurrencyInput = forwardRef(function CurrencyInput(args: Omit<Parameters<typeof Input>[0], "onChange"> & {
    onChange: (value: number | null) => void
}, ref: ForwardedRef<HTMLInputElement>) {
    // TODO: Fix number
    const { onChange, value, type, ...otherArgs } = args;
    return <Input
        value={formatNumberWithDots(value ? String(value) : "")}
        ref={ref}
        type="text"
        {...otherArgs}
        onChange={(e) => {
            const str = removeNonDigit(e.target.value);
            if (onChange)
                onChange(str ? parseInt(str) : null);
        }} />
});