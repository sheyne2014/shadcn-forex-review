'use client';

// Import specific exports from framer-motion and re-export them with named exports
// This avoids the "export *" syntax that causes issues with Next.js client boundaries
import {
  motion as _motion,
  useScroll as _useScroll,
  useInView as _useInView,
  AnimatePresence as _AnimatePresence,
  useAnimation as _useAnimation,
  useTransform as _useTransform,
  useMotionValue as _useMotionValue,
  useSpring as _useSpring,
  type MotionProps as _MotionProps,
  type Variants as _Variants,
  type AnimationControls as _AnimationControls,
  type TargetAndTransition as _TargetAndTransition,
  type VariantLabels as _VariantLabels,
} from 'framer-motion';

// Re-export with named exports
export const motion = _motion;
export const useScroll = _useScroll;
export const useInView = _useInView;
export const AnimatePresence = _AnimatePresence;
export const useAnimation = _useAnimation;
export const useTransform = _useTransform;
export const useMotionValue = _useMotionValue;
export const useSpring = _useSpring;

// Re-export types
export type MotionProps = _MotionProps;
export type Variants = _Variants;
export type AnimationControls = _AnimationControls;
export type TargetAndTransition = _TargetAndTransition;
export type VariantLabels = _VariantLabels;