import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type TClassValue = ClassValue;
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
