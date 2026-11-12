import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import type { StackGroup } from '@/data/es/stack';
import type { Dictionary } from '@/i18n';

type StackSectionProps = {
  index: string;
  dict: Dictionary;
  stack: StackGroup[];
};

export function StackSection({ index, dict, stack }: StackSectionProps) {
  return (
    <section id="stack" aria-labelledby="stack-title" className="py-16 sm:py-24">
      <Container>
        <div data-reveal>
          <SectionHeading
            id="stack-title"
            index={index}
            label={dict.home.stackLabel}
            title={dict.home.stackTitle}
          />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((group) => (
            <li
              key={group.area}
              data-reveal
              className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
            >
              <h3 className="font-mono text-sm text-muted">
                <span aria-hidden="true" className="text-accent-fg">
                  ./
                </span>
                {group.area.toLowerCase()}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-bg px-3 py-1.5 text-sm font-medium text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
