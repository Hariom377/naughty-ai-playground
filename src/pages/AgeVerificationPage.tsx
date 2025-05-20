
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface AgeVerificationPageProps {
  onVerify: () => void;
}

const AgeVerificationPage = ({ onVerify }: AgeVerificationPageProps) => {
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (confirmed) {
      onVerify();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-naughty-dark p-4">
      <div className="max-w-md w-full glass-card p-8 animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gradient mb-3">
            NaughtyyAI
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            AI-powered intimacy tools for adults
          </p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Age Verification Required</h2>
          <p className="text-gray-300 text-sm mb-4">
            This website contains adult content and is only for users who are 18 years of age or older.
          </p>
          <div className="h-0.5 w-16 bg-naughty-purple/50 mx-auto my-6"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="age-confirmation"
              checked={confirmed}
              onCheckedChange={(checked) => {
                setConfirmed(checked as boolean);
                if (checked) setError(false);
              }}
              className="data-[state=checked]:bg-naughty-purple data-[state=checked]:border-naughty-purple mt-1"
            />
            <Label
              htmlFor="age-confirmation"
              className={`text-gray-300 text-sm leading-relaxed ${error ? 'text-red-400' : ''}`}
            >
              I confirm that I am at least 18 years old and have the legal right to access adult content in my jurisdiction.
            </Label>
          </div>

          {error && (
            <p className="text-red-400 text-sm">
              You must confirm that you are at least 18 years old to continue.
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-naughty-purple hover:bg-naughty-purpleDark transition-colors"
          >
            Enter NaughtyyAI
          </Button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-8">
          By entering, you agree to our{' '}
          <a href="#" className="text-naughty-purple hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-naughty-purple hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default AgeVerificationPage;
