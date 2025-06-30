
import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';
import { useCategories } from '../hooks/useCategories';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';
import { Loader2 } from 'lucide-react';

const Categories = () => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading } = useCategories();

  const handleCategorySelect = (category: Category) => {
    console.log('Selected category:', category);
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Registration Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore all available categories for self-employment registration. 
            Each category is designed to support different types of businesses and entrepreneurial ventures.
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
      </div>
    </div>
  );
};

export default Categories;
