import React, { FC } from 'react';
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

const LoginForm: FC = () => {
  return (
    <Card className={'w-[90%] md:w-[400px]'}>
      <CardHeader className="text-center">
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription className="mt-1">Please sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          endIcon={<LuLogIn size={16} />}
          variant={'default'}
          className="w-full"
        >
          Sign In
        </Button>
        <OrDivider />
        <Button
          endIcon={<IoCreateOutline size={16} />}
          variant={'outline'}
          className="w-full"
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
