import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/lib/cn';

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: 'default' | 'narrow';
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = 'div'>({
  as,
  size = 'default',
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? 'div';
  return (
    <Component
      className={cn(
        'mx-auto w-full px-5 sm:px-8',
        size === 'default' ? 'max-w-5xl' : 'max-w-3xl',
        className,
      )}
      {...props}
    />
  );
}
