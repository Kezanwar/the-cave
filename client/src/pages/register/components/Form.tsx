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
import { LuLogIn } from 'react-icons/lu';
import useValidation, { UseValidationProps } from '@app/hooks/use-validation';
import { TRegisterForm, RegisterSchema } from '@app/validation/auth';
import store from '@app/store';
import useToggle from '@app/hooks/use-toggle';
import { Alert, AlertDescription } from '@app/components/web/ui/alert';
import Subheading from '@app/components/web/typography/sub-heading';
import { postRegister } from '@app/api/auth';

const validationConfig: UseValidationProps<TRegisterForm> = {
  schema: RegisterSchema,
  showToast: true,
  toastConfig: { autoHide: true, title: 'Login' }
};

const Form: FC = () => {
  const { validationErrors, validate, clear, setApiError } =
    useValidation(validationConfig);

  const [form, setForm] = useState<TRegisterForm>({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: ''
  });

  const [isLoading, setLoadingTrue, setLoadingFalse] = useToggle();

  const buildFieldSetter =
    (key: keyof TRegisterForm): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoadingTrue();
    const isValid = await validate(form);
    if (isValid) {
      try {
        const res = await postRegister(form);
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
        <CardContent className="flex flex-col gap-2">
          <Input
            onChange={buildFieldSetter('first_name')}
            error={validationErrors.email}
            placeholder="Email"
            type="email"
          />
          <Input
            onChange={buildFieldSetter('last_name')}
            error={validationErrors.email}
            placeholder="Email"
            type="email"
          />
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
          <Input
            error={validationErrors.password}
            onChange={buildFieldSetter('confirm_password')}
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
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Form;
