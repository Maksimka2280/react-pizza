import { ButtonHTMLAttributes, ReactNode } from "react";

export interface Buttonprops extends ButtonHTMLAttributes <HTMLButtonElement> {
    children: ReactNode,
    appersnce?: 'big' | 'spall',
    
}