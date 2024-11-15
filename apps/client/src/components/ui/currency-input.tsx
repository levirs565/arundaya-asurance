import * as React from "react"
import { inputClass } from "./input"
import { cn } from "@client/lib/utils"
import BaseCurrencyInput from "react-currency-input-field";

const CurrencyInput = React.forwardRef<HTMLInputElement, Parameters<typeof BaseCurrencyInput>[0]>(
    ({ className, ...props }, ref) => (
        <BaseCurrencyInput
            className={cn(inputClass, className)}
            ref={ref as any}
            {...props}
        />
    )
)
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };