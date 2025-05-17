"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Form schema
const brokerFormSchema = z.object({
  name: z.string().min(2, { message: "Broker name must be at least 2 characters." }),
  logoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  minDeposit: z.coerce.number().min(0, { message: "Minimum deposit must be a positive number." }).optional(),
  tradingFee: z.coerce.number().min(0, { message: "Trading fee must be a positive number." }).optional(),
  regulations: z.string().optional(),
  supportedAssets: z.string().optional(),
  country: z.string().optional(),
  rating: z.coerce.number().min(1, { message: "Rating must be between 1 and 5." }).max(5).optional(),
});

type FormValues = z.infer<typeof brokerFormSchema>;

// Support for categories
type Category = {
  id: string;
  name: string;
};

// Default empty form values
const defaultValues: FormValues = {
  name: '',
  logoUrl: '',
  minDeposit: undefined,
  tradingFee: undefined,
  regulations: '',
  supportedAssets: '',
  country: '',
  rating: undefined,
};

export function AddBrokerForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [brokerNameToScrape, setBrokerNameToScrape] = useState('');
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(brokerFormSchema),
    defaultValues,
  });

  // Load categories from API
  useState(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setAllCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  });

  // Scrape broker data from web
  const handleScrapeBroker = async () => {
    if (!brokerNameToScrape) return;
    
    setIsScraping(true);
    
    try {
      const response = await fetch('/api/scrape-broker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          brokerName: brokerNameToScrape 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to scrape broker data');
      }
      
      const data = await response.json();
      
      // Update form fields with scraped data
      if (data) {
        form.setValue('name', data.name || '');
        form.setValue('logoUrl', data.logoUrl || '');
        form.setValue('minDeposit', data.minDeposit || undefined);
        form.setValue('tradingFee', data.tradingFee || undefined);
        form.setValue('regulations', data.regulations || '');
        form.setValue('supportedAssets', data.supportedAssets ? data.supportedAssets.join(', ') : '');
        form.setValue('country', data.country || '');
        form.setValue('rating', data.rating || undefined);
        
        toast.success('Broker data scraped successfully!');
      } else {
        toast.warning('No broker data found');
      }
    } catch (error) {
      console.error('Error scraping broker data:', error);
      toast.error('Failed to scrape broker data');
    } finally {
      setIsScraping(false);
    }
  };
  
  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Form submission
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Prepare broker data for submission
      const brokerData = {
        ...data,
        supportedAssets: data.supportedAssets ? 
          data.supportedAssets.split(',').map(asset => asset.trim()) : 
          [],
        categoryIds: selectedCategories,
      };
      
      // Submit broker to API
      const response = await fetch('/api/brokers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(brokerData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add broker');
      }
      
      // Reset form
      form.reset();
      setSelectedCategories([]);
      
      // Show success message
      toast.success('Broker added successfully!');
      
      // Redirect to broker list
      router.push('/admin/brokers');
      router.refresh();
    } catch (error) {
      console.error('Error adding broker:', error);
      toast.error('Failed to add broker');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Broker</CardTitle>
        <CardDescription>
          Fill the details below to add a new broker. You can automatically fetch information by entering the broker name and clicking "Auto-Fill".
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Input 
            placeholder="Enter broker name to auto-fill..."
            value={brokerNameToScrape}
            onChange={(e) => setBrokerNameToScrape(e.target.value)}
            className="flex-1"
            disabled={isScraping}
          />
          <Button 
            onClick={handleScrapeBroker} 
            disabled={!brokerNameToScrape || isScraping}
            variant="secondary"
          >
            {isScraping ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Auto-Fill
          </Button>
        </div>
        
        {isScraping && (
          <Alert className="mb-6">
            <AlertDescription>
              Searching for broker information... This may take a moment.
            </AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Broker Name*</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. XYZ Broker" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com/logo.png" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="minDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Deposit</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        placeholder="e.g. 100" 
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tradingFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trading Fee</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        step="0.01"
                        placeholder="e.g. 0.1" 
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="regulations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Regulations</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. FCA, CySEC, ASIC" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. United Kingdom" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supportedAssets"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Supported Assets</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="e.g. Forex, Stocks, Crypto, Commodities" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (1-5)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        placeholder="e.g. 4.5" 
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <FormLabel className="block mb-2">Categories</FormLabel>
              <div className="flex flex-wrap gap-2">
                {allCategories.map(category => (
                  <Badge
                    key={category.id}
                    variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Broker
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 