"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ZoomIn, ExternalLink, Building2, Users, Smartphone, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: 'headquarters' | 'executives' | 'platform' | 'mobile' | 'technology' | 'regulatory';
  width?: number;
  height?: number;
}

interface ProfessionalImageGalleryProps {
  images: ImageItem[];
  className?: string;
}

const categoryIcons = {
  headquarters: Building2,
  executives: Users,
  platform: Monitor,
  mobile: Smartphone,
  technology: Monitor,
  regulatory: Building2,
};

const categoryLabels = {
  headquarters: 'Headquarters',
  executives: 'Leadership',
  platform: 'Platform',
  mobile: 'Mobile App',
  technology: 'Technology',
  regulatory: 'Regulatory',
};

export function ProfessionalImageGallery({ images, className }: ProfessionalImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];
  
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category !== 'all' ? categoryIcons[category as keyof typeof categoryIcons] : null;
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-2"
            >
              {Icon && <Icon className="h-4 w-4" />}
              {category === 'all' ? 'All Images' : categoryLabels[category as keyof typeof categoryLabels]}
            </Button>
          );
        })}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => {
          const Icon = categoryIcons[image.category];
          return (
            <Card key={image.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Icon className="h-3 w-3" />
                    {categoryLabels[image.category]}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    onClick={() => setSelectedImage(image)}
                    className="bg-white/90 text-black hover:bg-white"
                  >
                    <ZoomIn className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-1 line-clamp-1">{image.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {React.createElement(categoryIcons[selectedImage.category], { className: "h-5 w-5" })}
                  {selectedImage.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 80vw"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {categoryLabels[selectedImage.category]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedImage.description}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Default eToro images data
export const etoroImages: ImageItem[] = [
  {
    id: 'etoro-headquarters-cyprus',
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    alt: 'eToro headquarters building in Limassol, Cyprus',
    title: 'eToro Headquarters - Cyprus',
    description: 'eToro\'s main headquarters located in Limassol, Cyprus, housing the company\'s European operations and regulatory compliance teams.',
    category: 'headquarters',
    width: 800,
    height: 600,
  },
  {
    id: 'yoni-assia-ceo',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    alt: 'Yoni Assia, CEO and Founder of eToro',
    title: 'Yoni Assia - CEO & Founder',
    description: 'Yoni Assia, the visionary founder and CEO of eToro, who pioneered the social trading revolution in 2007.',
    category: 'executives',
    width: 400,
    height: 400,
  },
  {
    id: 'etoro-web-platform',
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    alt: 'eToro web trading platform interface',
    title: 'eToro Web Platform',
    description: 'The intuitive eToro web platform featuring social trading feeds, portfolio management, and copy trading functionality.',
    category: 'platform',
    width: 800,
    height: 600,
  },
  {
    id: 'etoro-mobile-app',
    src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop',
    alt: 'eToro mobile app on smartphone',
    title: 'eToro Mobile App',
    description: 'The award-winning eToro mobile app, providing full trading functionality and social features on the go.',
    category: 'mobile',
    width: 400,
    height: 600,
  },
  {
    id: 'social-trading-interface',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    alt: 'eToro social trading network interface',
    title: 'Social Trading Network',
    description: 'eToro\'s revolutionary social trading interface showing trader profiles, performance statistics, and copy trading options.',
    category: 'platform',
    width: 800,
    height: 600,
  },
  {
    id: 'regulatory-licenses',
    src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    alt: 'Financial regulatory compliance and licenses',
    title: 'Regulatory Compliance',
    description: 'eToro maintains strict regulatory compliance with CySEC, FCA, ASIC, and FinCEN across multiple jurisdictions.',
    category: 'regulatory',
    width: 800,
    height: 400,
  },
];
