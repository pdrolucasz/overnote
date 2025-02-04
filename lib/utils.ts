import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractTextFromHTML(html: string) {
  if (typeof window === "undefined") return html

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  return doc.body.textContent?.trim() || ""
}

export function getApiUrl(url: string) {
  return `${process.env.NEXT_PUBLIC_URL}/api/${url}`
}
