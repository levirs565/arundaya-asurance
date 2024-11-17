import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(time: Date | number) {
  const date = new Date(time);
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
}

const numberFormat =  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });

export function formatCurrency(value: number) {
  return numberFormat.format(value);
}