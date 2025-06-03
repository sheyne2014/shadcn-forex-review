"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

const profileFormSchema = z.object({
  displayName: z
    .string()
    .min(2, { message: "Display name must be at least 2 characters." })
    .max(30, { message: "Display name must not be longer than 30 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(160, { message: "Bio must not be longer than 160 characters." }).optional(),
  tradingExperience: z.enum(["beginner", "intermediate", "advanced", "professional"]),
  tradingFrequency: z.enum(["daily", "weekly", "monthly", "rarely"]),
  favoriteMarkets: z.array(z.string()).optional(),
  avatarUrl: z.string().optional(),
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  brokerUpdates: z.boolean(),
  newReviewNotifications: z.boolean(),
  securityAlerts: z.boolean(),
});

const privacyFormSchema = z.object({
  profileVisibility: z.enum(["public", "private", "friends"]),
  showReviews: z.boolean(),
  showFavorites: z.boolean(),
  allowTagging: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
type PrivacyFormValues = z.infer<typeof privacyFormSchema>;

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: "John Doe",
      email: "john.doe@example.com",
      bio: "Forex trader with 3+ years of experience specializing in technical analysis and swing trading.",
      tradingExperience: "intermediate",
      tradingFrequency: "daily",
      favoriteMarkets: [],
      avatarUrl: "",
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      marketingEmails: false,
      brokerUpdates: true,
      newReviewNotifications: true,
      securityAlerts: true,
    },
  });

  const privacyForm = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      profileVisibility: "public",
      showReviews: true,
      showFavorites: true,
      allowTagging: false,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      toast.success("Profile settings updated successfully");
    }, 1000);
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      toast.success("Notification preferences updated successfully");
    }, 1000);
  }

  function onPrivacySubmit(data: PrivacyFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      toast.success("Privacy settings updated successfully");
    }, 1000);
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and trading preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Upload new avatar
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or GIF. 1MB max.
                  </p>
                </div>
              </div>

              <Separator />

              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <FormField
                    control={profileForm.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Your email address is used for notifications and account recovery.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Tell us about your trading style and experience" 
                            className="resize-none" 
                          />
                        </FormControl>
                        <FormDescription>
                          Write a short bio about yourself. This will be visible on your public profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={profileForm.control}
                      name="tradingExperience"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Trading Experience</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="beginner" />
                                </FormControl>
                                <FormLabel className="font-normal">Beginner</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="intermediate" />
                                </FormControl>
                                <FormLabel className="font-normal">Intermediate</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="advanced" />
                                </FormControl>
                                <FormLabel className="font-normal">Advanced</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="professional" />
                                </FormControl>
                                <FormLabel className="font-normal">Professional</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="tradingFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trading Frequency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="rarely">Rarely</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How often do you typically trade?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                      )}
                      Save Profile Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you receive and how they are delivered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationsForm}>
                <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={notificationsForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Email Notifications</FormLabel>
                            <FormDescription>
                              Receive email notifications about your account activity.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Marketing Emails</FormLabel>
                            <FormDescription>
                              Receive emails about new features, promotions, and offers.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="brokerUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Broker Updates</FormLabel>
                            <FormDescription>
                              Receive notifications when brokers you follow are updated.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="newReviewNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">New Review Notifications</FormLabel>
                            <FormDescription>
                              Get notified when new reviews are posted for brokers you follow.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="securityAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Security Alerts</FormLabel>
                            <FormDescription>
                              Receive notifications about security updates and suspicious activity.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                      )}
                      Save Notification Preferences
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your profile visibility and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...privacyForm}>
                <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-6">
                  <FormField
                    control={privacyForm.control}
                    name="profileVisibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Visibility</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="friends">Friends Only</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose who can see your profile on the platform.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={privacyForm.control}
                      name="showReviews"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Show My Reviews</FormLabel>
                            <FormDescription>
                              Allow others to see reviews you've posted.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={privacyForm.control}
                      name="showFavorites"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Show My Favorites</FormLabel>
                            <FormDescription>
                              Allow others to see brokers you've favorited.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={privacyForm.control}
                      name="allowTagging"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Allow Tagging</FormLabel>
                            <FormDescription>
                              Allow other users to tag you in comments and reviews.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                      )}
                      Save Privacy Settings
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="bg-muted/30 flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Privacy settings updated 3 days ago
              </div>
              <Button variant="outline" size="sm">
                Download Personal Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}