"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Define component props interfaces for better type safety
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// Use React.forwardRef for better component composition and ref forwarding
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn(
          "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(
          "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
          className
        )}
        {...props}
      />
    )
  }
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-title"
        className={cn("leading-none font-semibold", className)}
        {...props}
      />
    )
  }
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-description"
        className={cn("text-muted-foreground text-sm", className)}
        {...props}
      />
    )
  }
)
CardDescription.displayName = "CardDescription"

const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-action"
        className={cn(
          "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
          className
        )}
        {...props}
      />
    )
  }
)
CardAction.displayName = "CardAction"

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={cn("px-6", className)}
        {...props}
      />
    )
  }
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
        {...props}
      />
    )
  }
)
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
