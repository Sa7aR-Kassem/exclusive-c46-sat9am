import * as z from 'zod'

export const defaultValues = {
    details: "",
    city: "",
    postalCode: "",
    phone: ""
}

export const addressSchema = z.object({
    details: z.string().nonempty().min(3).max(15),
    city: z.string().nonempty().min(3).max(15),
    postalCode: z.string().nonempty().min(3).max(15),
    phone: z.string().regex(/^(002)?01[0125][0-9]{8}$/),
    paymentMethod: z.string().min(1)
});

export type AddressPayloadType = z.infer<typeof addressSchema>

