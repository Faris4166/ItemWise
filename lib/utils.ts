import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const calculateSubtotal = (items: { qty: number; price: number }[]) =>
  items.reduce((sum, item) => sum + item.qty * item.price, 0);

export const formatBaht = (num: number) =>
  num.toLocaleString("th-TH", { style: "currency", currency: "THB" });
