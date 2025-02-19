import { InferType, object, ref, string } from 'yup';

export const LoginSchema = object().shape({
  email: string()
    .email('Must be a valid email address')
    .required('Email is required'),
  password: string().required('Password is required')
});

export type TLoginForm = InferType<typeof LoginSchema>;

export const RegisterSchema = object().shape({
  first_name: string().required('First name is required'),
  last_name: string().required('Last name is required'),
  email: string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  password: string()
    .matches(/[@$!%*#?&]+/, 'Password must have special character')
    .matches(/\d+/, 'Password must have one number')
    .matches(/[a-z]+/, 'Password must have one lowercase character')
    .matches(/[A-Z]+/, 'Password must have uppercase character'),
  confirm_password: string()
    .required('Must confirm your password')
    .oneOf([ref('password')], 'Passwords must match')
});

export const ChangePasswordSchema = object().shape({
  password: string()
    .matches(/[@$!%*#?&]+/, 'Password must have special character')
    .matches(/\d+/, 'Password must have one number')
    .matches(/[a-z]+/, 'Password must have one lowercase character')
    .matches(/[A-Z]+/, 'Password must have uppercase character'),
  confirm_password: string()
    .required('Must confirm your password')
    .oneOf([ref('password')], 'Passwords must match')
});

export const ForgotPasswordSchema = object().shape({
  email: string()
    .required('Email is required')
    .email('Email must be a valid email address')
});
