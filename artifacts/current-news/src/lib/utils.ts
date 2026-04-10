import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Removes any trailing sentence that ends with "..." (truncated by the API).
 * Splits on sentence-ending punctuation, drops the last segment if it ends with ellipsis.
 */
export function trimSummary(text: string): string {
  if (!text) return text;
  // Split into sentences (keep delimiter attached)
  const sentences = text.match(/[^.!?]*[.!?]+\s*/g) ?? [text];
  const last = sentences[sentences.length - 1].trimEnd();
  if (last.endsWith("...") || last.endsWith("…")) {
    sentences.pop();
    return sentences.join("").trimEnd();
  }
  return text;
}
