export function ErrorLabel({ text, className }: { text: string, className?: string }) {
    return <p className={"text-sm font-medium text-red-500 dark:text-red-900 " + className}>{text}</p>
}