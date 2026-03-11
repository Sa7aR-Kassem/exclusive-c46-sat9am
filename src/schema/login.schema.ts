import * as z from 'zod'

export const defaultValues = {
    email: "",
    password: ""
}

export const loginSchema = z.object({
    email: z.email({ error: "Invalid Email" }),
    password: z.string().nonempty({ error: "Required Password" }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Invalid Password')
});

export type LoginPayloadType = z.infer<typeof loginSchema>

