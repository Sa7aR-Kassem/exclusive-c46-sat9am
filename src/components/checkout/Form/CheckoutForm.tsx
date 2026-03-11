"use client";
import { addressSchema, AddressPayloadType, defaultValues } from "@/schema/address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createAnOrder } from "@/actions/orders.actions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CheckoutFormProps {
    cartId: string
}
export default function CheckoutForm({ cartId }: CheckoutFormProps) {
    const router = useRouter()
    const { handleSubmit, control, getValues } = useForm<AddressPayloadType>({
        defaultValues,
        resolver: zodResolver(addressSchema),
        mode: "onChange"
    })

    async function onSubmit(formValues: AddressPayloadType) {
        console.log(formValues);

        const res = await createAnOrder(cartId, formValues)
        console.log(res);

        if (res.status) {
            //     // to login

            if (getValues('paymentMethod') === 'cash') {
                toast.success(res.message)
                router.push('/allorders')
            } else {
                // location.href = res.success_url
                open(res.session.url, "_self")
            }
        } else {
            toast.error(res.error.message)
        }


    }

    return <section className="py-12">
        <div className="max-w-2xl mx-auto px-10">

            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    {/******** Details  ********/}
                    <Controller
                        name="details"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Address in detailed</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your detailed address"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    {/******** City  ********/}
                    <Controller
                        name="city"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your city"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    {/******** postalCode  ********/}
                    <Controller
                        name="postalCode"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>postalCode</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your post code"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/******** Phone  ********/}
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your egyptian phone"
                                    autoComplete="off"
                                    type="tel"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />


                    <Controller
                        name="paymentMethod"
                        control={control}
                        render={({ field, fieldState }) => (
                            <>

                                <RadioGroup
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >

                                    {/* <div className="flex items-center gap-3">
                                        <RadioGroupItem value="option-one" id="option-one" />
                                        <Label htmlFor="option-one">Option One</Label>
                                    </div> */}
                                    <FieldLabel key={"cash"} htmlFor={"cash"}>
                                        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                                            <RadioGroupItem
                                                value={"cash"}
                                                id={"cash"}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            <Label htmlFor="option-one">Cash</Label>
                                        </Field>
                                    </FieldLabel>
                                    <FieldLabel key={"card"} htmlFor={"card"}>
                                        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                                            <RadioGroupItem
                                                value={"card"}
                                                id={"card"}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            <Label htmlFor="option-one">Card</Label>

                                        </Field>
                                    </FieldLabel>

                                </RadioGroup>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </>
                        )}
                    />

                    <Button type="submit">  Place an order </Button>
                </FieldGroup>


            </form>

        </div>




    </section>;
}
