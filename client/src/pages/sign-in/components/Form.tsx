import { FC, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@app/components/ui/card';
import { Input } from '@app/components/ui/input';
import { Button } from '@app/components/ui/button';
import { OrDivider } from '@app/components/ui/divider';
import { LuLogIn } from 'react-icons/lu';
import { IoCreateOutline } from 'react-icons/io5';
import useValidation, { UseValidationProps } from '@app/hooks/use-validation';
import { TLoginForm, LoginSchema } from '@app/validation/auth';

import store from '@app/store';
import useToggle from '@app/hooks/use-toggle';

const validationConfig: UseValidationProps<TLoginForm> = {
  schema: LoginSchema,
  showToast: true,
  toastConfig: { autoHide: true, title: 'Login' }
};

const Form: FC = () => {
  const { validationErrors, validate, clear } = useValidation(validationConfig);

  const [form, setForm] = useState<TLoginForm>({ email: '', password: '' });

  const [isLoading, setLoadingTrue, setLoadingFalse] = useToggle();

  const buildFieldSetter =
    (key: string): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoadingTrue();
    const isValid = await validate(form);
    if (isValid) {
      await store.auth.signIn(form);
    }
    setLoadingFalse();
  };

  return (
    <Card className={'w-[90%] md:w-[400px]'}>
      <CardHeader className="text-center">
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription className="mt-1">Please sign in</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <CardContent className="flex flex-col gap-2">
          <Input
            onChange={buildFieldSetter('email')}
            error={validationErrors.email}
            placeholder="Email"
            type="email"
          />
          <Input
            error={validationErrors.password}
            onChange={buildFieldSetter('password')}
            placeholder="Password"
            type="password"
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            loading={isLoading}
            endIcon={<LuLogIn size={16} />}
            variant={'default'}
            className="w-full"
          >
            Sign In
          </Button>
          <OrDivider />
          <Button
            onClick={() => clear('password')}
            endIcon={<IoCreateOutline size={16} />}
            variant={'outline'}
            className="w-full"
          >
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Form;
