
import React, { useState } from 'react';
import { Calculator, DollarSign, CreditCard } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const IncomeCalculatorPage = () => {
  const { toast } = useToast();
  const [platform, setPlatform] = useState<'patreon' | 'onlyfans'>('patreon');
  const [subscribers, setSubscribers] = useState<string>('100');
  const [avgTip, setAvgTip] = useState<string>('5');
  const [tierPrice, setTierPrice] = useState<string>('10');
  const [results, setResults] = useState<{
    monthlyIncome: number;
    annualIncome: number;
    platformFee: number;
    netIncome: number;
  } | null>(null);

  const handleCalculate = () => {
    const subCount = parseInt(subscribers) || 0;
    const tipAmount = parseFloat(avgTip) || 0;
    const subscription = parseFloat(tierPrice) || 0;
    
    // Platform fee rates
    const feeRate = platform === 'patreon' ? 0.08 : 0.20; // 8% for Patreon, 20% for OnlyFans
    
    // Calculate monthly income
    const monthlySubscription = subCount * subscription;
    const monthlyTips = subCount * tipAmount;
    const monthlyTotal = monthlySubscription + monthlyTips;
    
    // Calculate platform fees
    const fees = monthlyTotal * feeRate;
    
    // Calculate net income
    const netMonthly = monthlyTotal - fees;
    const annualIncome = netMonthly * 12;
    
    setResults({
      monthlyIncome: monthlyTotal,
      annualIncome: annualIncome,
      platformFee: fees,
      netIncome: netMonthly,
    });
    
    toast({
      title: "Calculation complete!",
      description: "Your potential earnings have been calculated.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-romantic mb-6 text-gradient text-center">
          Patreon & OnlyFans Calculator
        </h1>
        <p className="text-naughty-pink mb-8 text-center">
          Estimate your potential earnings from content creation platforms
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="romantic-card p-6">
            <h2 className="text-xl font-romantic mb-4 text-white">Calculator</h2>
            
            <div className="flex justify-center space-x-4 mb-6">
              <Button
                variant={platform === 'patreon' ? 'default' : 'outline'}
                onClick={() => setPlatform('patreon')}
                className="flex-1"
              >
                Patreon
              </Button>
              <Button
                variant={platform === 'onlyfans' ? 'default' : 'outline'}
                onClick={() => setPlatform('onlyfans')}
                className="flex-1"
              >
                OnlyFans
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="subscribers">Number of Subscribers</Label>
                <div className="flex items-center mt-1">
                  <CreditCard className="mr-2 text-naughty-pink" />
                  <Input
                    id="subscribers"
                    type="number"
                    value={subscribers}
                    onChange={(e) => setSubscribers(e.target.value)}
                    className="romantic-input"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="tierPrice">
                  {platform === 'patreon' ? 'Average Tier Price' : 'Subscription Price'}
                </Label>
                <div className="flex items-center mt-1">
                  <DollarSign className="mr-2 text-naughty-pink" />
                  <Input
                    id="tierPrice"
                    type="number"
                    value={tierPrice}
                    onChange={(e) => setTierPrice(e.target.value)}
                    className="romantic-input"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="avgTip">Average Tip Amount</Label>
                <div className="flex items-center mt-1">
                  <DollarSign className="mr-2 text-naughty-pink" />
                  <Input
                    id="avgTip"
                    type="number"
                    value={avgTip}
                    onChange={(e) => setAvgTip(e.target.value)}
                    className="romantic-input"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <Button 
                className="w-full romantic-button mt-4" 
                onClick={handleCalculate}
              >
                Calculate <Calculator className="ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="romantic-card p-6">
            <h2 className="text-xl font-romantic mb-4 text-white">Results</h2>
            
            {results ? (
              <div className="space-y-4">
                <Card className="bg-white/5 border-naughty-pink/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Monthly Income</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl text-gradient font-romantic">{formatCurrency(results.monthlyIncome)}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-naughty-pink/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Platform Fee</CardTitle>
                    <CardDescription className="text-xs">
                      ({platform === 'patreon' ? '8%' : '20%'} of total income)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl text-naughty-pink">{formatCurrency(results.platformFee)}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-naughty-pink/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Net Monthly Income</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl text-white">{formatCurrency(results.netIncome)}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-naughty-pink/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Annual Income</CardTitle>
                    <CardDescription className="text-xs">(projected over 12 months)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl text-white">{formatCurrency(results.annualIncome)}</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <Calculator size={48} className="text-naughty-pink/50 mb-4" />
                <p className="text-naughty-pink/70">
                  Enter your details and click "Calculate" to see potential earnings
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="romantic-card p-6 mt-8">
          <h2 className="text-xl font-romantic mb-2 text-white">Tips to Increase Your Income</h2>
          <ul className="space-y-2 ml-4 list-disc text-naughty-pink/80">
            <li>Post content regularly to keep subscribers engaged</li>
            <li>Offer different tier levels with unique benefits</li>
            <li>Engage with your audience through comments and messages</li>
            <li>Promote your page on social media and other platforms</li>
            <li>Create special content for high-tier subscribers</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default IncomeCalculatorPage;
