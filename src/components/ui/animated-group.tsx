'use client'

import * as React from "react"
import { motion, useInView, type MotionProps, type Variants } from "@/lib/framer-motion"

interface AnimatedGroupProps extends Omit<MotionProps, 'variants'> {
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

  // Default variants if none provided
  const defaultVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    }
  }

  // Use provided variants or defaults
  const containerVariants = variants?.container || defaultVariants.container
  const itemVariants = variants?.item || defaultVariants.item

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          )
        }
        return child
      })}
    </motion.div>
  )
}