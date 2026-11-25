import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Joins Tailwind class names and resolves conflicts, so the last one wins:
 * cn("px-2 py-1", isActive && "bg-orange", "px-4") → "py-1 bg-orange px-4".
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
