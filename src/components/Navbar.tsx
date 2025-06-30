
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Info, Grid3X3, Search, UserCheck } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-sm">ES</span>
              </div>
              <span className="font-bold text-xl text-gray-800">E-LIFE SOCIETY</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'}
                className="flex items-center space-x-2"
              >
                <Home size={16} />
                <span>Home</span>
              </Button>
            </Link>
            
            <Link to="/about">
              <Button 
                variant={isActive('/about') ? 'default' : 'ghost'}
                className="flex items-center space-x-2"
              >
                <Info size={16} />
                <span>About Project</span>
              </Button>
            </Link>
            
            <Link to="/categories">
              <Button 
                variant={isActive('/categories') ? 'default' : 'ghost'}
                className="flex items-center space-x-2"
              >
                <Grid3X3 size={16} />
                <span>Categories</span>
              </Button>
            </Link>
            
            <Link to="/check-status">
              <Button 
                variant={isActive('/check-status') ? 'default' : 'ghost'}
                className="flex items-center space-x-2"
              >
                <Search size={16} />
                <span>Check Status</span>
              </Button>
            </Link>
            
            <Link to="/admin-login">
              <Button 
                variant={isActive('/admin-login') ? 'default' : 'ghost'}
                className="flex items-center space-x-2"
              >
                <UserCheck size={16} />
                <span>Admin Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
