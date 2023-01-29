import { cva, type VariantProps } from 'class-variance-authority';

const callout = cva(
  [
    'my-5',
    'p-3',
    'font-sans',
    'text-sm',
    'leading-normal',
    'rounded-md',
    'border-l-[6px]',
    '[&>:last-child]:mb-0',
    '[&>:first-child]:mt-0',
    '[&>:first-child]:before:font-bold',
  ],
  {
    variants: {
      type: {
        note: [
          'border-zinc-600',
          'bg-zinc-100',
          'dark:bg-zinc-800',
          "[&>:first-child]:before:content-['Note:_']",
        ],
        info: [
          'border-blue-600',
          'bg-blue-100/50',
          'dark:bg-blue-700/25',
          'dark:text-blue-50',
          "[&>:first-child]:before:content-['Info:_']",
        ],
        tip: [
          'border-green-600',
          'bg-green-100/75',
          'dark:bg-green-700/25',
          'dark:text-green-50',
          "[&>:first-child]:before:content-['Tip:_']",
        ],
        warning: [
          'border-amber-600',
          'bg-amber-100/50',
          'dark:bg-amber-700/25',
          'dark:text-amber-50',
          "[&>:first-child]:before:content-['Warning:_']",
        ],
        danger: [
          'border-red-600',
          'bg-red-100/50',
          'dark:bg-red-700/25',
          'dark:text-red-50',
          "[&>:first-child]:before:content-['Danger:_']",
        ],
      },
    },
    defaultVariants: {
      type: 'warning',
    },
  }
);

export type CalloutProps = JSX.IntrinsicElements['aside'] &
  VariantProps<typeof callout>;

export const Callout = ({ type = 'warning', children }: CalloutProps) => (
  <aside role="note" className={callout({ type })}>
    {children}
  </aside>
);

export const ALL_CALLOUT_TYPES = [
  'note',
  'info',
  'tip',
  'warning',
  'danger',
] as const;
