
import { useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';
import RegistrationForm from '../components/RegistrationForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Category, Registration } from '../types';
import { useCategories } from '../hooks/useCategories';
import { useAnnouncements } from '../hooks/useAnnouncements';
import { useCreateRegistration } from '../hooks/useRegistrations';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { toast } = useToast();
  
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: announcements = [], isLoading: announcementsLoading } = useAnnouncements();
  const createRegistration = useCreateRegistration();

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    console.log('Selected category:', category);
  };

  const handleRegistrationSubmit = async (registrationData: Omit<Registration, 'id' | 'customer_id' | 'status' | 'created_at' | 'updated_at'>) => {
    console.log('Registration submitted:', registrationData);
    
    try {
      // Generate customer ID
      const customerId = `ESEP${registrationData.mobile}${registrationData.name.charAt(0).toUpperCase()}`;
      
      // Create new registration
      const newRegistration = {
        customer_id: customerId,
        ...registrationData,
        status: 'pending' as const,
      };
      
      await createRegistration.mutateAsync(newRegistration);
      
      toast({
        title: "Registration Successful!",
        description: `Customer ID: ${customerId}. Your application is pending approval.`
      });
      
      setSelectedCategory(null);
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (categoriesLoading || announcementsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            E-LIFE SOCIETY
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Self Employment Registration Hub
          </p>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Join our hybrid ecommerce platform connecting home delivery services and self-employment programs. 
            Register for various categories and start your entrepreneurial journey today.
          </p>
        </div>
      </div>

      {/* Announcements */}
      {announcements.length > 0 && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Announcement</Badge>
                  <span className="font-medium">{announcement.title}</span>
                  <span className="text-gray-600">- {announcement.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedCategory ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Choose Your Registration Category
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select the category that best fits your business model and goals. 
                Each category offers unique opportunities and benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onSelect={handleCategorySelect}
                />
              ))}
            </div>
          </>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Registration for {selectedCategory.name}
              </h2>
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory(null)}
              >
                Change Category
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Selected Category</h3>
                    <CategoryCard
                      category={selectedCategory}
                      onSelect={() => {}}
                      isSelected={true}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <RegistrationForm
                  selectedCategory={selectedCategory}
                  onSubmit={handleRegistrationSubmit}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
