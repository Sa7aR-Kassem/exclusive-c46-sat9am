"use client";
import { LoginPayloadType, loginSchema, defaultValues } from "@/schema/login.schema";
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
import { loginHandler } from "@/actions/auth.actions";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter()
  const { handleSubmit, control } = useForm<LoginPayloadType>({
    defaultValues,
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  })

  async function onSubmit(formValues: LoginPayloadType) {
    console.log(formValues);

    const resp = await signIn("credentials", { ...formValues, redirect: false, callbackUrl: "/" })
    console.log(resp);

    if (resp?.ok) {
      toast.success("Welcome Back!")
      router.push('/')
    } else {
      toast.error(resp?.error)
    }

    // fetch api
    // const data = await loginHandler(formValues)
    // console.log(data);
    // // 
    // if (data.message === "success") {
    //   alert("Welcome back")
    // } else {
    //   alert(data.error)

    // }
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

          <Button type="submit">  Login </Button>
        </FieldGroup>


      </form>

    </div>




  </section>;
}
