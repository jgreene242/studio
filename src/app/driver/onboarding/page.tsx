"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, UploadCloud, Car } from "lucide-react";
import Link from "next/link";

const onboardingSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Valid phone number is required."), // Basic validation
  password: z.string().min(6, "Password must be at least 6 characters."),
  
  vehicleMake: z.string().min(2, "Vehicle make is required."),
  vehicleModel: z.string().min(1, "Vehicle model is required."),
  vehicleYear: z.coerce.number().min(1990, "Vehicle year must be 1990 or newer.").max(new Date().getFullYear() + 1, `Year cannot be in the future.`),
  licensePlate: z.string().min(3, "License plate is required."),
  
  driversLicense: z.instanceof(File, { message: "Driver's license is required." }).optional(), // Making it optional for UI, validation can be trickier for files client-side only
  vehicleRegistration: z.instanceof(File, { message: "Vehicle registration is required." }).optional(),
  insuranceProof: z.instanceof(File, { message: "Proof of insurance is required." }).optional(),
  
  agreedToTerms: z.boolean().refine(val => val === true, {message: "You must agree to the terms and conditions."}),
});

export default function DriverOnboardingPage() {
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: undefined,
      licensePlate: "",
      agreedToTerms: false,
    },
  });

  function onSubmit(values: z.infer<typeof onboardingSchema>) {
    // TODO: Implement actual driver onboarding logic (API calls, file uploads)
    console.log("Driver Onboarding Data:", values);
    alert("Registration submitted! We will review your application.");
    // router.push('/driver/dashboard/pending-approval'); // Redirect on successful submission
  }
  
  // Helper for file input display
  const FileInputField = ({field, label, description}: any) => (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input 
            type="file" 
            onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} 
            className="cursor-pointer"
        />
      </FormControl>
      {field.value && <FormDescription>Selected: {(field.value as File).name}</FormDescription>}
      <FormMessage />
    </FormItem>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-background">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Car className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl font-headline">Become a DispatchNow Driver</CardTitle>
          </div>
          <CardDescription>Complete the form below to start your journey with us.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <section>
                <h3 className="text-lg font-semibold mb-2 border-b pb-1 font-headline">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="(555) 123-4567" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="password" render={({ field }) => ( <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2 border-b pb-1 font-headline">Vehicle Details</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="vehicleMake" render={({ field }) => ( <FormItem><FormLabel>Vehicle Make</FormLabel><FormControl><Input placeholder="e.g., Toyota" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="vehicleModel" render={({ field }) => ( <FormItem><FormLabel>Vehicle Model</FormLabel><FormControl><Input placeholder="e.g., Camry" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="vehicleYear" render={({ field }) => ( <FormItem><FormLabel>Vehicle Year</FormLabel><FormControl><Input type="number" placeholder="e.g., 2020" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="licensePlate" render={({ field }) => ( <FormItem><FormLabel>License Plate</FormLabel><FormControl><Input placeholder="e.g., ABC-123" {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2 border-b pb-1 font-headline">Document Upload</h3>
                <p className="text-sm text-muted-foreground mb-3">Please upload clear copies of the following documents.</p>
                <div className="grid md:grid-cols-1 gap-4">
                   <FormField control={form.control} name="driversLicense" render={({ field }) => (<FileInputField field={field} label="Driver's License" />)} />
                   <FormField control={form.control} name="vehicleRegistration" render={({ field }) => (<FileInputField field={field} label="Vehicle Registration" />)} />
                   <FormField control={form.control} name="insuranceProof" render={({ field }) => (<FileInputField field={field} label="Proof of Insurance" />)} />
                </div>
                <FormDescription className="mt-2 text-xs">
                    <UploadCloud className="inline w-3 h-3 mr-1" /> File types accepted: JPG, PNG, PDF. Max size: 5MB per file.
                </FormDescription>
              </section>
              
              <FormField
                control={form.control}
                name="agreedToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the <Link href="/driver-terms" className="text-primary hover:underline">Driver Terms and Conditions</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <UserPlus className="mr-2 h-4 w-4" /> Submit Application
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already a driver? <Link href="/driver/login" className="text-primary hover:underline">Log In</Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
