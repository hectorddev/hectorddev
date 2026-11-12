'use client';

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from 'react';
import { CheckIcon, CopyIcon } from '@/components/icons';

type CodeBlockProps = ComponentPropsWithoutRef<'pre'> & {
  labels: { copy: string; copied: string };
};

/** `<pre>` de los bloques de código con botón para copiar. */
export function CodeBlock({ children, labels, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  async function copy() {
    const text = preRef.current?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ''));
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Portapapeles no disponible (contexto inseguro o permiso denegado).
    }
  }

  return (
    <div className="group/code relative">
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? labels.copied : labels.copy}
        title={copied ? labels.copied : labels.copy}
        className="absolute top-2.5 right-2.5 inline-flex size-9 items-center justify-center rounded-md border border-border bg-surface text-muted transition hover:text-fg md:opacity-0 md:group-hover/code:opacity-100 md:focus-visible:opacity-100"
      >
        {copied ? <CheckIcon className="text-accent-fg" /> : <CopyIcon />}
      </button>
      <span role="status" className="sr-only">
        {copied ? labels.copied : ''}
      </span>
    </div>
  );
}
