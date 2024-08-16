"use server";
import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerifiationToken } from '@/data/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async( values: z.infer<typeof RegisterSchema> ) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error:"Invalid fields!"
        };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return {error: "Email alreay in use!"};
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    
    const verificationToken = await generateVerifiationToken(email);

    await sendVerificationEmail( verificationToken.email, verificationToken.token );

    return { success: "Confirmation email  sent!"}
}