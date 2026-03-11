import * as z from 'zod'

export const defaultValues = {
    email: "",
    name: "",
    password: "",
    rePassword: "",
    phone: ""
}

export const registerSchema = z.object({
    name: z.string().nonempty().min(3).max(15),
    email: z.email({ error: "Invalid Email" }),
    password: z.string().nonempty({ error: "Required Password" }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Invalid Password'),
    rePassword: z.string().nonempty({ error: "Required Password" }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Invalid Password'),
    phone: z.string().regex(/^(002)?01[0125][0-9]{8}$/)
}).refine((data) => {
    if (data.password === data.rePassword) {
        return true
    }

    return false
}, { error: "Passwords are not match", path: ["rePassword"] });

export type RegisterPayloadType = z.infer<typeof registerSchema>

