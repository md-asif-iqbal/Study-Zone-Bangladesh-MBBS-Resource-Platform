import type { StudyYear } from "@/lib/types";

export const YEARS: { value: StudyYear; label: string }[] = [
  { value: "1st", label: "1st Professional" },
  { value: "2nd", label: "2nd Professional" },
  { value: "3rd", label: "3rd Professional" },
  { value: "4th", label: "4th / Final Professional" },
  { value: "internship", label: "Internship" },
];

export function yearLabel(year: StudyYear | null | undefined): string {
  if (!year) return "";
  return YEARS.find((y) => y.value === year)?.label ?? year;
}
