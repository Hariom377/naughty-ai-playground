
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  const testimonials = [
    {
      name: 'Sarah M.',
      text: isEnglish ? 'The love language decoder helped me understand my partner better. Our communication improved dramatically!' : 'लव लैंग्वेज डिकोडर ने मुझे अपने साथी को बेहतर समझने में मदद की।',
      rating: 5,
      verified: true
    },
    {
      name: 'Alex K.',
      text: isEnglish ? 'Amazing tools for improving relationships. The AI suggestions are spot-on and really helpful.' : 'रिश्ते सुधारने के लिए अद्भुत उपकरण। AI सुझाव बिल्कुल सही हैं।',
      rating: 5,
      verified: true
    },
    {
      name: 'Jamie L.',
      text: isEnglish ? 'Private, secure, and incredibly useful. These tools have transformed how we communicate.' : 'निजी, सुरक्षित और अविश्वसनीय रूप से उपयोगी।',
      rating: 5,
      verified: true
    }
  ];

  return (
    <section className="w-full px-4 mb-16" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-center mb-8 romantic-title">
          {isEnglish ? 'What Our Users Say' : 'हमारे उपयोगकर्ता क्या कहते हैं'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="romantic-card feature-card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-naughty-pink/50 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-naughty-pink text-naughty-pink" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-naughty-pink">{testimonial.name}</span>
                  {testimonial.verified && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                      ✓ {isEnglish ? 'Verified' : 'सत्यापित'}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
