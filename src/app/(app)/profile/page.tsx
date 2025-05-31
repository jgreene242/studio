"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit3 } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(), // Add phone validation if needed, e.g. .regex(/^\+[1-9]\d{1,14}$/)
  profilePictureUrl: z.string().url().optional().or(z.literal("")),
});

export default function ProfilePage() {
  // Placeholder data - replace with actual user data
  const currentUser = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+15551234567",
    profilePictureUrl: "https://placehold.co/100x100.png",
  };

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      profilePictureUrl: currentUser.profilePictureUrl || "",
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    // TODO: Implement profile update logic
    console.log("Profile updated:", values);
    alert("Profile updated successfully!");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary">User Profile</CardTitle>
          <CardDescription>Manage your account details and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="profilePictureUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-2">
                      <AvatarImage src={field.value || undefined} alt={form.getValues("name")} data-ai-hint="person portrait" />
                      <AvatarFallback><User className="w-10 h-10" /></AvatarFallback>
                    </Avatar>
                    <FormControl>
                       {/* Basic file input, in real app use a proper upload component */}
                      <Input type="file" accept="image/*" className="text-sm max-w-xs" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                           // For demo, just logging. In real app, upload and set URL.
                           console.log(e.target.files[0].name);
                           // field.onChange(URL.createObjectURL(e.target.files[0])); // This is temporary for preview
                        }
                      }}/>
                    </FormControl>
                     <FormDescription className="text-center">Upload a new profile picture.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
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
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                     <FormDescription>
                        This email is used for login and communication.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Edit3 className="mr-2 h-4 w-4" /> Update Profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
