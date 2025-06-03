'use client'

import * as React from "react"
import { motion, useInView, type MotionProps, type Variants } from "@/lib/framer-motion"

interface AnimatedGroupProps extends MotionProps {
  children: React.ReactNode
  className?: string
  variants?: {
    container?: Variants
    item?: Variants
  }
}

export function AnimatedGroup({
  children,
  className,
  variants,
  ...props
}: AnimatedGroupProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants?.container}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div variants={variants?.item}>
              {child}
            </motion.div>
          )
        }
        return child
      })}
    </motion.div>
  )
}