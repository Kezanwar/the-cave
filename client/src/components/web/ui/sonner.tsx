import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const options = {
  classNames: {
    toast:
      'group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-950 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-neutral-950 dark:group-[.toaster]:text-neutral-50 dark:group-[.toaster]:border-neutral-800',
    description:
      'group-[.toast]:text-neutral-500 dark:group-[.toast]:text-neutral-400',
    actionButton:
      'group-[.toast]:bg-neutral-900 group-[.toast]:text-neutral-50 dark:group-[.toast]:bg-neutral-100 dark:group-[.toast]:text-neutral-900 active:scale-95 transition-transform duration-150',
    cancelButton:
      'group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500 dark:group-[.toast]:bg-neutral-800 dark:group-[.toast]:text-neutral-400 active:scale-95 transition-transform duration-150'
  }
};

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={options}
      {...props}
    />
  );
};

export { Toaster };
