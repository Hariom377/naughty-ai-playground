
import React from 'react';
import { Star, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TestimonialsSection: React.FC = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      text: isEnglish 
        ? "The Flirt Coach completely transformed my dating confidence! I went from awkward conversations to smooth, engaging chats."
        : "फ्लर्ट कोच ने मेरे डेटिंग कॉन्फिडेंस को पूरी तरह से बदल दिया! मैं अजीब बातचीत से सहज, आकर्षक चैट तक पहुंच गया।",
      location: "New York, USA"
    },
    {
      name: "Alex & Jamie",
      rating: 5,
      text: isEnglish
        ? "The Interest Overlap Finder revealed so many hidden connections we never knew we had. It's like discovering your partner all over again!"
        : "इंटरेस्ट ओवरलैप फाइंडर ने इतने छुपे हुए कनेक्शन खोजे जिनके बारे में हमें पता ही नहीं था। यह अपने साथी को फिर से खोजने जैसा है!",
      location: "London, UK"
    },
    {
      name: "Marcus R.",
      rating: 5,
      text: isEnglish
        ? "Text CPR saved my relationship! When our conversations got stale, this tool helped me reignite the spark with creative messages."
        : "टेक्स्ट सीपीआर ने मेरे रिश्ते को बचाया! जब हमारी बातचीत बासी हो गई, तो इस टूल ने मुझे रचनात्मक संदेशों के साथ स्पार्क को फिर से जगाने में मदद की।",
      location: "Toronto, Canada"
    }
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
          {isEnglish ? 'What Our Users Say' : 'हमारे उपयोगकर्ता क्या कहते हैं'}
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          {isEnglish 
            ? 'Real stories from couples who transformed their relationships with our AI tools'
            : 'उन जोड़ों की वास्तविक कहानियां जिन्होंने हमारे AI टूल्स से अपने रिश्तों को बदला'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="glass-card p-6 hover:scale-105 transition-all duration-300 group"
          >
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-gray-300 mb-4 italic leading-relaxed">
              "{testimonial.text}"
            </blockquote>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.location}</p>
              </div>
              <Heart className="w-5 h-5 text-naughty-pink group-hover:scale-110 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
