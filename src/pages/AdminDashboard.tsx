
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, Users, FileText, Settings, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRegistrations } from '@/hooks/useRegistrations';
import { useToast } from '@/hooks/use-toast';

interface AdminSession {
  id: string;
  username: string;
  role: string;
  name: string;
  loginTime: string;
}

const AdminDashboard = () => {
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: registrations, isLoading } = useRegistrations();

  useEffect(() => {
    const session = localStorage.getItem('adminSession');
    if (!session) {
      navigate('/admin-login');
      return;
    }
    
    try {
      const parsed = JSON.parse(session);
      setAdminSession(parsed);
    } catch (error) {
      console.error('Invalid admin session:', error);
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate('/admin-login');
  };

  if (!adminSession) {
    return <div>Loading...</div>;
  }

  const pendingRegistrations = registrations?.filter(r => r.status === 'pending') || [];
  const approvedRegistrations = registrations?.filter(r => r.status === 'approved') || [];
  const rejectedRegistrations = registrations?.filter(r => r.status === 'rejected') || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {adminSession.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              Role: {adminSession.role}
            </Badge>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {isLoading ? '...' : registrations?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {isLoading ? '...' : pendingRegistrations.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {isLoading ? '...' : approvedRegistrations.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {isLoading ? '...' : rejectedRegistrations.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Registrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div>Loading registrations...</div>
            ) : registrations?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No registrations found
              </div>
            ) : (
              <div className="space-y-4">
                {registrations?.slice(0, 10).map((registration) => (
                  <div key={registration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{registration.name}</h3>
                      <p className="text-sm text-gray-600">
                        ID: {registration.customer_id} | Mobile: {registration.mobile}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          registration.status === 'approved' ? 'default' :
                          registration.status === 'pending' ? 'secondary' : 'destructive'
                        }
                      >
                        {registration.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
