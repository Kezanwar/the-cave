import { FC, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '@app/components/web/ui/card';
import { Input } from '@app/components/web/ui/input';
import { Button } from '@app/components/web/ui/button';
import { OrDivider } from '@app/components/web/ui/divider';
import { LuLogIn } from 'react-icons/lu';
import { IoCreateOutline } from 'react-icons/io5';
import useValidation, { UseValidationProps } from '@app/hooks/use-validation';
import { TLoginForm, LoginSchema } from '@app/validation/auth';
import store from '@app/store';
import useToggle from '@app/hooks/use-toggle';
import { Alert, AlertDescription } from '@app/components/web/ui/alert';
import Subheading from '@app/components/web/typography/sub-heading';
import { postSignIn } from '@app/api/auth';

const validationConfig: UseValidationProps<TLoginForm> = {
  schema: LoginSchema,
  showToast: true,
  toastConfig: { autoHide: true, title: 'Login' }
};

const Form: FC = () => {
  const { validationErrors, validate, clear, setApiError } =
    useValidation(validationConfig);

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
      try {
        const res = await postSignIn(form);
        store.auth.authenticate(res.data);
      } catch (error) {
        setApiError(error);
        store.auth.unauthenticate();
      }
    }
    setLoadingFalse();
  };

  return (
    <Card className={'w-[90%] md:w-[400px]'}>
      <CardHeader className="text-center">
        <Subheading variant="primary" size="md">
          Welcome back!
        </Subheading>
        <CardDescription className="mt-1">Please sign in</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <CardContent className="flex flex-col gap-3">
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
          {validationErrors.apiError && (
            <Alert variant={'destructive'}>
              <AlertDescription>{validationErrors.apiError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            loading={isLoading}
            endIcon={<LuLogIn size={16} />}
            variant={'default'}
            className="w-full"
          >
            Sign In
          </Button>
          <OrDivider />
          <Button
            type="button"
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
