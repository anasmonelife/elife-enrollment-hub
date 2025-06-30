
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { registrations, categories, panchayaths } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

const CheckStatus = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({ title: "Error", description: "Please enter Customer ID or Mobile Number", variant: "destructive" });
      return;
    }

    setIsSearching(true);
    console.log('Searching for:', searchQuery);

    setTimeout(() => {
      const result = registrations.find(reg => 
        reg.customerId === searchQuery || reg.mobile === searchQuery
      );

      if (result) {
        const category = categories.find(cat => cat.id === result.categoryId);
        const panchayath = panchayaths.find(p => p.id === result.panchayathId);
        
        setSearchResult({
          ...result,
          categoryName: category?.name,
          panchayathName: panchayath?.name,
          district: panchayath?.district
        });
      } else {
        setSearchResult(null);
        toast({ title: "Not Found", description: "No registration found with this Customer ID or Mobile Number", variant: "destructive" });
      }
      
      setIsSearching(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      default: return 'Pending Approval';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Check Registration Status
          </h1>
          <p className="text-xl text-gray-600">
            Enter your Customer ID or Mobile Number to check your application status
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search size={20} />
              <span>Search Registration</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="search">Customer ID or Mobile Number</Label>
                <Input
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Customer ID (e.g., ESEP9876543210J) or Mobile Number"
                  className="text-center text-lg"
                />
              </div>
              
              <Button 
                onClick={handleSearch} 
                className="w-full" 
                size="lg"
                disabled={isSearching}
              >
                {isSearching ? 'Searching...' : 'Search Status'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {searchResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Registration Details
                <Badge className={getStatusColor(searchResult.status)}>
                  {getStatusText(searchResult.status)}
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Customer ID</Label>
                    <p className="text-lg font-mono">{searchResult.customerId}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Name</Label>
                    <p className="text-lg">{searchResult.name}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Mobile Number</Label>
                    <p className="text-lg">{searchResult.mobile}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Category</Label>
                    <p className="text-lg font-medium text-blue-600">{searchResult.categoryName}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Panchayath</Label>
                    <p className="text-lg">{searchResult.panchayathName} - {searchResult.district}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Ward</Label>
                    <p className="text-lg">{searchResult.ward}</p>
                  </div>
                  
                  {searchResult.agentPro && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Agent/PRO</Label>
                      <p className="text-lg">{searchResult.agentPro}</p>
                    </div>
                  )}
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Applied Date</Label>
                    <p className="text-lg">{new Date(searchResult.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              {searchResult.status === 'pending' && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">
                    <strong>Status:</strong> Your application is pending approval. 
                    You will be notified once the payment approval process is completed.
                  </p>
                </div>
              )}
              
              {searchResult.status === 'approved' && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-800">
                    <strong>Congratulations!</strong> Your registration has been approved. 
                    You can now start using the services.
                  </p>
                </div>
              )}
              
              {searchResult.status === 'rejected' && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-800">
                    <strong>Application Rejected:</strong> Please contact our support team for more information.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CheckStatus;
