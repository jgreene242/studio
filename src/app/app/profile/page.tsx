
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit3, Loader2, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore"; // Added serverTimestamp
import { updateProfile as updateFirebaseProfile } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address.").readonly(), // Email should not be editable here
  phone: z.string().optional(),
  profilePictureUrl: z.string().url().optional().or(z.literal("")),
});

export default function ProfilePage() {
  const { user, initialLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);


  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      profilePictureUrl: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const dbData = userDoc.data();
            const combinedData = {
                name: dbData.name || user.displayName || "", // Prioritize Firestore name
                email: user.email || "", // Email from auth is primary
                phone: dbData.phone || user.phoneNumber || "", // Prioritize Firestore phone, fallback to auth phone
                profilePictureUrl: dbData.profilePictureUrl || user.photoURL || "", // Prioritize Firestore pic
              };
              form.reset(combinedData);
            } else {
              // If no Firestore doc, create one based on Auth user
              const initialData = {
                name: user.displayName || "",
                email: user.email || "",
                phone: user.phoneNumber || "", // Get phone number from auth if available
                profilePictureUrl: user.photoURL || "",
              };
              await setDoc(userDocRef, {
                ...initialData,
                uid: user.uid,
                createdAt: serverTimestamp(), // Use serverTimestamp
                role: "passenger", // Default role
              });
              form.reset(initialData);
              toast({ title: "Profile Initialized", description: "Your profile has been set up." });
            }
        } catch (e) {
          console.error("Error fetching user data for profile:", e);
          toast({ variant: "destructive", title: "Profile Load Failed", description: "Could not load your profile data." });
        }
      }
    };

    if (!authLoading && user) {
      fetchUserData().catch(e => {
         console.error("Unhandled error in fetchUserData (ProfilePage):", e);
         toast({ variant: "destructive", title: "Error", description: "Failed to load profile data due to an unexpected error." });
      });
    }
  }, [user, authLoading]); // Removed form and toast from dependencies

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    if (!user) {
      toast({ variant: "destructive", title: "Error", description: "You are not logged in." });
      return;
    }
    setIsSaving(true);
    try {
      // Update Firebase Auth profile
      if (auth.currentUser && (auth.currentUser.displayName !== values.name || auth.currentUser.photoURL !== values.profilePictureUrl)) {
        await updateFirebaseProfile(auth.currentUser, {
          displayName: values.name,
          photoURL: values.profilePictureUrl || null,
        });
      }

      // Update Firestore document
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        name: values.name,
        phone: values.phone || "",
        profilePictureUrl: values.profilePictureUrl || "",
        // email is not updated here as it's an auth property usually managed differently
      });

      toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMessage = error instanceof Error ? error.message : "Could not update your profile.";
      toast({ variant: "destructive", title: "Update Failed", description: errorMessage });
    } finally {
      setIsSaving(false);
    }
  }

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-destructive flex items-center justify-center">
              <ShieldAlert className="mr-2 h-7 w-7" /> Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Please log in to view your profile.</p>
            <Button asChild className="mt-4">
              <a href="/auth/login">Go to Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
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
                      <Input type="file" accept="image/*" className="text-sm max-w-xs" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                           toast({title: "Note", description: "Profile picture upload is a demo. Actual upload needs to be implemented."})
                        }
                      }} disabled={isSaving}/>
                    </FormControl>
                     <FormDescription className="text-center">Upload a new profile picture. (Upload logic not yet implemented)</FormDescription>
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
                      <Input placeholder="Your full name" {...field} disabled={isSaving} />
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
                      <Input type="email" placeholder="your.email@example.com" {...field} readOnly disabled={isSaving} />
                    </FormControl>
                     <FormDescription>
                        Your email address cannot be changed here.
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
                      <Input type="tel" placeholder="+1 (555) 123-4567" {...field} disabled={isSaving} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Edit3 className="mr-2 h-4 w-4" />}
                {isSaving ? "Saving..." : "Update Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
