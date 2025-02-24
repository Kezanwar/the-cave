import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const options = {
  classNames: {
    toast:
      'group toast group-[.toaster]:bg-white group-[.toaster]:text-stone-950 group-[.toaster]:border-stone-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-stone-950 dark:group-[.toaster]:text-stone-50 dark:group-[.toaster]:border-stone-800',
    description:
      'group-[.toast]:text-stone-500 dark:group-[.toast]:text-stone-400',
    actionButton:
      'group-[.toast]:bg-stone-900 group-[.toast]:text-stone-50 dark:group-[.toast]:bg-stone-100 dark:group-[.toast]:text-stone-900 active:scale-95 transition-transform duration-150',
    cancelButton:
      'group-[.toast]:bg-stone-100 group-[.toast]:text-stone-500 dark:group-[.toast]:bg-stone-800 dark:group-[.toast]:text-stone-400 active:scale-95 transition-transform duration-150'
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
