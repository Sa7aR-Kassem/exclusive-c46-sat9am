"use client";
import { RegisterPayloadType, registerSchema, defaultValues } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { registerHandler } from "@/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const router = useRouter()
  const { handleSubmit, control } = useForm<RegisterPayloadType>({
    defaultValues,
    resolver: zodResolver(registerSchema),
    mode: "onChange"
  })

  async function onSubmit(formValues: RegisterPayloadType) {
    console.log(formValues);

    const res = await registerHandler(formValues)
    console.log(res);

    if (res.ok) {
      // to login
      toast.success("Account has been register successfully")
      router.push('/')
    } else {
      toast.error(res.error.message)
    }


  }

  return <section className="py-12">
    <div className="max-w-2xl mx-auto px-10">

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {/******** Email  ********/}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/******** Name  ********/}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your name"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/******** Password  ********/}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/******** Password  ********/}
          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password again"
                  autoComplete="off"
                  type="password"
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

          <Button type="submit">  Register </Button>
        </FieldGroup>


      </form>

    </div>




  </section>;
}
