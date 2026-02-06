"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import {  useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import SignupImage from "../assets/register_image.png"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import { useState } from "react"
import { Spinner } from "./ui/spinner"
import { useRouter } from "next/navigation"


export function SignupForm({role, className, ...props}: React.ComponentProps<"div">) {

  const navigate = useRouter()
  const [loading , setLoading] = useState(false)
  const { register, handleSubmit , reset} = useForm<{
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string
  }>()


  const onSubmit = async(data: {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role : string
    }) => {
      setLoading(true)
        if (!data.password.includes(data.confirmPassword)) {
          return toast.error("Password didn't matched!")
        }

        const signupdData = {
          name: data.username || "N/A",
          email: data.email,
          password: data.password,
          role : role || "student"
        }

        try {
          const signupResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(signupdData)
        })
        if(signupResponse.ok){
          setLoading(false)
          reset()
          toast.success("Signup Successfull.");
          navigate.push("/");
        }else{
          setLoading(false)
          reset()
          toast.error("Failed to create account!")
        }
        } catch (error) {
          setLoading(false)
          reset()
          console.log(error)
          toast.error("Failed to create account!")
        }
    
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  placeholder="username"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input {...register("password")} id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input {...register("confirmPassword")} id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button  type="submit">
                  {loading ? <Spinner></Spinner>: "Create Account"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field className="grid grid-cols-1 ">
                <Button  variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Sign up with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/login">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={SignupImage}
              alt="Image"
              priority
              quality={100}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            ></Image>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
