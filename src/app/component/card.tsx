import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type DivProps = React.ComponentPropsWithoutRef<"div">;
type H3Props  = React.ComponentPropsWithoutRef<"h3">;
type PProps   = React.ComponentPropsWithoutRef<"p">;

const Card = React.forwardRef<HTMLDivElement, DivProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, DivProps>(({ className, ...p }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...p} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, H3Props>(({ className, ...p }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...p} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, PProps>(({ className, ...p }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...p} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, DivProps>(({ className, ...p }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...p} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, DivProps>(({ className, ...p }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...p} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
