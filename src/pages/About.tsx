
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About E-LIFE SOCIETY Project
          </h1>
          <p className="text-xl text-gray-600">
            Empowering Self-Employment Through Technology
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>What is Pennyekart?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Pennyekart is a unique hybrid ecommerce platform that connects home delivery services 
                with self-employment programs through the "E-LIFE SOCIETY". This innovative approach 
                makes it a truly hybrid ecommerce platform, offering both business opportunities and 
                employment solutions in one integrated system.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pennyekart Free Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Completely free registration with free delivery service between 2pm to 6pm. 
                  Basic level access to get you started on your entrepreneurial journey.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pennyekart Paid Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Premium registration offering any time delivery between 8am to 7pm. 
                  Full access to all platform features and extended service hours.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FarmeLife</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Connects you with dairy farms, poultry farms, and other agricultural ventures. 
                  Perfect for those interested in farming and agricultural businesses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>OrganeLife</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Focused on vegetable and house gardening, especially terrace vegetable farming. 
                  Ideal for urban farming enthusiasts and organic produce sellers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FoodeLife</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Connected with food processing businesses and food-related enterprises. 
                  Perfect for home chefs and food entrepreneurs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>EntreLife</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Connected with skilled projects like stitching, art works, and various home services. 
                  Great for artisans and service providers.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">Job Card (Special Category)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <p>
                  The Job Card is our special offer card available only for first-time registrations. 
                  It's the best choice for applying to all categories instead of separate category registrations.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Special fee cut packages and exclusive discounts</li>
                  <li>Convertible to any category (but not reversible)</li>
                  <li>Functions as an investment card for earning points and profits</li>
                  <li>Special offers and priority access to new features</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To create a comprehensive ecosystem that supports self-employment and entrepreneurship 
                through technology. We aim to bridge the gap between service providers and customers 
                while creating sustainable income opportunities for individuals across various sectors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
