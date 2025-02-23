"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"

type FormType ="sign-in" | "sign-up";

const AuthForm = ({type}:{type: FormType}) => {
  const [isLoading, setIsLoading] =useState(false)
  const [errorMessage , setErrorMessage] =useState('')
 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  
  const onSubmit= async(values: z.infer<typeof formSchema>)=> {
    
    console.log(values)
  }
  return (
    <>
   <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">
         {type==="sign-in"?"Sign In":"Sign Up"}
        </h1>
        {type=== "sign-up" && (    <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <div className="shad-form-item">
               <FormLabel className="shad-form-label">Full Name</FormLabel>
                    <FormControl>
                <Input placeholder="Enter your full name" className="shad-input" {...field} />
              </FormControl>
              </div>
            
              <FormMessage className="shad-input" />
            </FormItem>
          )}
        />)}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <div className="shad-form-item">
               <FormLabel className="shad-form-label">Email</FormLabel>
                    <FormControl>
                <Input placeholder="Enter your email" className="shad-input" {...field} />
              </FormControl>
              </div>
            
              <FormMessage className="shad-input" />
            </FormItem>
          )}
        />
        
        
    
        <Button type="submit" className="form-submit-button" disabled={isLoading}>
          {type==="sign-in"?"sign In": "sign Up"}
          {
            isLoading && (<Image src="/assests/icons/loader.svg" alt="loader" width={24} height={24} className="ml-2 animate-spin"/>)
          }
        </Button>
        {
          errorMessage && (<p className="error-message">*{errorMessage}</p>)
        }
        <div className="body-2 flex justify-center">
           <p className="text-light-100">
             {
              type==="sign-in"?
              "Don't have an account?":
              "Already have an account?"
             }
           </p>
           <Link href={type==="sign-in"?"/sign-up":"/sign-in"} className="ml-1 font-medium text-brand">
           {type==="sign-in"?"Sign Up":"Sign In"}
           </Link>
        </div>
      </form>
    </Form>
    OTP Verification
    </>
  )
}

export default AuthForm