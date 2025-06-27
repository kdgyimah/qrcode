'use client';

import { QRCategory } from '@/types/qr-generator';
import { QR_CATEGORIES } from '@/lib/qr-categories';
import * as Icons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoryGridProps {
  onCategorySelect: (category: QRCategory) => void;
}

export function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Create your QR Code</h1>
        <p className="text-muted-foreground">Create all QR Codes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {QR_CATEGORIES.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons] as any;
          
          return (
            <Card
              key={category.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-blue-200"
              onClick={() => onCategorySelect(category)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={cn(
                  "w-12 h-12 mx-auto rounded-lg flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110",
                  category.color
                )}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}