
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserPlus, Car, ShieldCheck, UploadCloud, Loader2 } from 'lucide-react';

const vehicleYearRegex = /^(19|20)\d{2}$/; // Matches years from 1900 to 2099

const onboardingSchema = z.object({
  // Personal Info
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),

  // Vehicle Info
  vehicleMake: z.string().min(2, "Vehicle make is required."),
  vehicleModel: z.string().min(1, "Vehicle model is required."),
  vehicleYear: z.string().regex(vehicleYearRegex, "Enter a valid 4-digit year (e.g., 2023)."),
  vehicleColor: z.string().min(2, "Vehicle color is required."),
  licensePlate: z.string().min(2, "License plate is required.").max(10, "License plate too long."),

  // License Info
  driversLicenseNumber: z.string().min(5, "Driver's license number is required."),
  licenseExpiryDate: z.string().min(1, "License expiry date is required."), // Basic validation, use date picker for better UX

  // Document Uploads - types will be FileList, but for Zod, string is fine for placeholder
  licenseDocument: z.any().optional(), // In a real app, use z.instanceof(FileList) and refine
  vehicleRegistrationDocument: z.any().optional(),
  insuranceDocument: z.any().optional(),

}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function DriverOnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      licensePlate: "",
      driversLicenseNumber: "",
      licenseExpiryDate: "",
    },
  });

  async function onSubmit(_values: z.infer<typeof onboardingSchema>) {
    setIsLoading(true);
    try {
      // TODO: Implement actual driver registration logic:
      // 1. Create Firebase Auth user (if not linking to existing passenger account)
      // 2. Upload documents to Firebase Storage, get download URLs
      // 3. Save driver details (including document URLs) to Firestore 'drivers' collection
      

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      

      router.push('/driver/dashboard');
      form.reset();
      toast({ title: "Application Submitted!", description: "We will review your application and get back to you soon." });
    } catch (error) {
      console.error("Error during driver onboarding submission:", error);
      toast({ variant: "destructive", title: "Submission Error", description: "An unexpected error occurred while submitting your application." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary flex items-center">
          <Car className="mr-3 h-7 w-7" /> Become a Paradise Rides Driver
        </CardTitle>
        <CardDescription>Fill out the form below to start your journey with us.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Personal Information */}
            <section>
              <h3 className="text-lg font-semibold mb-3 border-b pb-2 flex items-center"><UserPlus className="mr-2 h-5 w-5 text-accent" />Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <Separator className="my-8" />

            {/* Vehicle Information */}
            <section>
              <h3 className="text-lg font-semibold mb-3 border-b pb-2 flex items-center"><Car className="mr-2 h-5 w-5 text-accent" />Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="vehicleMake"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Make</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Toyota" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Camry" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Year</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="YYYY" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Color</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Blue" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="licensePlate"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>License Plate Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ABC-123" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>
            
            <Separator className="my-8" />

            {/* License Information */}
            <section>
              <h3 className="text-lg font-semibold mb-3 border-b pb-2 flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-accent" />License Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="driversLicenseNumber"
                  render={({ field }) => (	
                    <FormItem>
                      <FormLabel>Driver&apos;s License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter license number" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}	
                />
                <FormField
                  control={form.control}
                  name="licenseExpiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Expiry Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <Separator className="my-8" />

            {/* Document Uploads */}
            <section>
              <h3 className="text-lg font-semibold mb-3 border-b pb-2 flex items-center"><UploadCloud className="mr-2 h-5 w-5 text-accent" />Document Uploads</h3>
              <FormDescription className="mb-4">
                Please upload clear copies of the following documents. Max file size 5MB each. (Actual upload functionality to be implemented).
              </FormDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="licenseDocument"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver&apos;s License Copy</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*,.pdf" onChange={(e) => field.onChange(e.target.files)} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleRegistrationDocument"
                  render={({ field }) => (	
                    <FormItem>
                      <FormLabel>Vehicle Registration Copy</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*,.pdf" onChange={(e) => field.onChange(e.target.files)} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="insuranceDocument"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Vehicle Insurance Copy</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*,.pdf" onChange={(e) => field.onChange(e.target.files)} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-8" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Car className="mr-2 h-4 w-4" />}
              Submit Application
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col items-center justify-center text-sm text-muted-foreground">
        <p>Already have an account or need to go back?</p>
        <Link href="/" className="font-medium text-primary hover:underline">
          Return to Homepage
        </Link>
      </CardFooter>
    </Card>
  );
}
