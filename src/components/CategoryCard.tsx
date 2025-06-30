
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
  isSelected?: boolean;
}

const CategoryCard = ({ category, onSelect, isSelected }: CategoryCardProps) => {
  const isSpecial = category.name.includes('Job Card');
  const isFree = category.actualFee === 0;
  
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
      } ${isSpecial ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : ''}`}
      onClick={() => onSelect(category)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
            {category.name}
          </CardTitle>
          {isSpecial && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Special
            </Badge>
          )}
          {isFree && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">
              Free
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm leading-relaxed">
          {category.description}
        </p>
        
        <div className="space-y-2">
          {!isFree && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Actual Fee:</span>
                <span className="text-gray-500 line-through">₹{category.actualFee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-medium">Offer Fee:</span>
                <span className="text-green-600 font-bold text-lg">₹{category.offerFee}</span>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Save ₹{category.actualFee - category.offerFee}
                </Badge>
              </div>
            </>
          )}
          {isFree && (
            <div className="text-center">
              <span className="text-green-600 font-bold text-xl">FREE</span>
            </div>
          )}
        </div>
        
        <Button 
          className="w-full mt-4" 
          variant={isSelected ? "default" : "outline"}
        >
          {isSelected ? 'Selected' : 'Select Category'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
