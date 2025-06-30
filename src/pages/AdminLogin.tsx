
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Login attempt:', credentials);
      
      // Query the admins table to verify credentials
      const { data: admin, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', credentials.username.toLowerCase())
        .eq('password_hash', credentials.password.toLowerCase()) // Convert to lowercase for comparison
        .eq('is_active', true)
        .maybeSingle();
      
      if (error) {
        console.error('Login error:', error);
        throw error;
      }
      
      console.log('Admin query result:', admin);
      
      if (admin) {
        // Update last login time
        await supabase
          .from('admins')
          .update({ last_login: new Date().toISOString() })
          .eq('id', admin.id);
        
        localStorage.setItem('adminSession', JSON.stringify({
          id: admin.id,
          username: admin.username,
          role: admin.role,
          name: admin.name,
          loginTime: new Date().toISOString()
        }));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${admin.name}!`
        });
        
        navigate('/admin');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-4">
            <UserCheck size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <p className="text-gray-600">E-LIFE SOCIETY Admin Panel</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-sm text-gray-600">
            <p className="mb-2"><strong>Demo Credentials:</strong></p>
            <div className="space-y-1">
              <p>Super Admin: evaadmin / eva919123</p>
              <p>Local Admin: admin1 / elife9094</p>
              <p>User Admin: admin2 / penny9094</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
