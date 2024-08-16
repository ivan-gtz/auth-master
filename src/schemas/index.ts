import * as z from 'zod';

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message: "Minimum of 6 characters required"
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email es requerido"
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email es requerido"
    }),
    password: z.string().min(6,{
        message: "Password is requerido"
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email es requerido"
    }),
    password: z.string().min(6,{
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
});