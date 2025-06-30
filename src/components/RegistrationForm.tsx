
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Category, Panchayath, Registration } from '../types';
import { usePanchayaths } from '../hooks/usePanchayaths';

interface RegistrationFormProps {
  selectedCategory: Category;
  onSubmit: (registration: Omit<Registration, 'id' | 'customer_id' | 'status' | 'created_at' | 'updated_at'>) => void;
}

const RegistrationForm = ({ selectedCategory, onSubmit }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
    panchayath_id: '',
    ward: '',
    agent_pro: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { data: panchayaths = [] } = usePanchayaths();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast({ title: "Error", description: "Name is required", variant: "destructive" });
      return false;
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      toast({ title: "Error", description: "Valid 10-digit mobile number is required", variant: "destructive" });
      return false;
    }
    if (!formData.address.trim()) {
      toast({ title: "Error", description: "Address is required", variant: "destructive" });
      return false;
    }
    if (!formData.panchayath_id) {
      toast({ title: "Error", description: "Please select a panchayath", variant: "destructive" });
      return false;
    }
    if (!formData.ward.trim()) {
      toast({ title: "Error", description: "Ward is required", variant: "destructive" });
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowConfirmation(true);
  };

  const confirmSubmission = () => {
    setIsSubmitting(true);
    console.log('Submitting registration:', { ...formData, category_id: selectedCategory.id });
    
    setTimeout(() => {
      onSubmit({ ...formData, category_id: selectedCategory.id });
      setIsSubmitting(false);
      setShowConfirmation(false);
      
      // Generate customer ID
      const customerId = `ESEP${formData.mobile}${formData.name.charAt(0).toUpperCase()}`;
      toast({ 
        title: "Registration Submitted!", 
        description: `Your Customer ID: ${customerId}. Please save this for status checking.`,
        duration: 10000
      });
      
      // Reset form
      setFormData({
        name: '',
        address: '',
        mobile: '',
        panchayath_id: '',
        ward: '',
        agent_pro: ''
      });
    }, 1500);
  };

  const selectedPanchayath = panchayaths.find(p => p.id === formData.panchayath_id);

  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Registration Form
            <Badge className="bg-blue-100 text-blue-800">
              {selectedCategory.name}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your complete address"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="panchayath">Panchayath *</Label>
                <Select onValueChange={(value) => handleInputChange('panchayath_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select panchayath" />
                  </SelectTrigger>
                  <SelectContent>
                    {panchayaths.map((panchayath) => (
                      <SelectItem key={panchayath.id} value={panchayath.id}>
                        {panchayath.name} - {panchayath.district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="ward">Ward *</Label>
                <Input
                  id="ward"
                  value={formData.ward}
                  onChange={(e) => handleInputChange('ward', e.target.value)}
                  placeholder="Enter ward number/name"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="agentPro">Agent/P.R.O</Label>
              <Input
                id="agentPro"
                value={formData.agent_pro}
                onChange={(e) => handleInputChange('agent_pro', e.target.value)}
                placeholder="Enter agent or PRO name (optional)"
              />
            </div>
            
            <Button type="submit" className="w-full" size="lg">
              Submit Registration
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Registration</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Registration Details:</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Category:</strong> {selectedCategory.name}</div>
                <div><strong>Name:</strong> {formData.name}</div>
                <div><strong>Mobile:</strong> {formData.mobile}</div>
                <div><strong>Panchayath:</strong> {selectedPanchayath?.name} - {selectedPanchayath?.district}</div>
                <div><strong>Ward:</strong> {formData.ward}</div>
                {formData.agent_pro && <div><strong>Agent/PRO:</strong> {formData.agent_pro}</div>}
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Fee Details:</h4>
              {selectedCategory.actual_fee === 0 ? (
                <div className="text-green-600 font-bold">FREE Registration</div>
              ) : (
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Actual Fee:</span>
                    <span className="line-through text-gray-500">₹{selectedCategory.actual_fee}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-green-600">
                    <span>Offer Fee:</span>
                    <span>₹{selectedCategory.offer_fee}</span>
                  </div>
                  <div className="text-center text-green-600 font-bold">
                    You Save: ₹{selectedCategory.actual_fee - selectedCategory.offer_fee}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmSubmission}
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegistrationForm;
