
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  const faqs = [
    {
      question: isEnglish ? "Is NaughtyyAI safe and private?" : "क्या NaughtyyAI सुरक्षित और निजी है?",
      answer: isEnglish 
        ? "Absolutely! We prioritize your privacy with end-to-end encryption, no data storage of personal conversations, and complete anonymity. Your intimate conversations stay between you and our AI."
        : "बिल्कुल! हम एंड-टू-एंड एन्क्रिप्शन, व्यक्तिगत बातचीत का कोई डेटा स्टोरेज नहीं, और पूर्ण गुमनामी के साथ आपकी निजता को प्राथमिकता देते हैं।"
    },
    {
      question: isEnglish ? "What's the difference between free and premium features?" : "निःशुल्क और प्रीमियम सुविधाओं में क्या अंतर है?",
      answer: isEnglish
        ? "Free features include basic tools like Sexting Generator, Love Notes, and Interest Finder. Premium unlocks advanced tools like Erotic Chat, Social Spy, Fight Moderator, and unlimited usage of all features."
        : "निःशुल्क सुविधाओं में सेक्सटिंग जेनरेटर, लव नोट्स, और इंटरेस्ट फाइंडर जैसे बुनियादी टूल शामिल हैं। प्रीमियम सभी सुविधाओं के उन्नत टूल्स और असीमित उपयोग को अनलॉक करता है।"
    },
    {
      question: isEnglish ? "How does the AI understand relationship context?" : "AI रिश्ते के संदर्भ को कैसे समझता है?",
      answer: isEnglish
        ? "Our AI is trained on relationship psychology, communication patterns, and emotional intelligence. It adapts to your communication style and relationship stage to provide personalized advice and content."
        : "हमारा AI रिश्ते की मनोविज्ञान, संचार पैटर्न, और भावनात्मक बुद्धिमत्ता पर प्रशिक्षित है। यह आपकी संचार शैली और रिश्ते के चरण के अनुकूल होता है।"
    },
    {
      question: isEnglish ? "Can I use these tools with my partner?" : "क्या मैं इन टूल्स को अपने साथी के साथ उपयोग कर सकता हूं?",
      answer: isEnglish
        ? "Many of our tools are designed for couples! Interest Overlap Finder, Fight Moderator, and Anniversary Ideas work great when used together. Some tools like Flirt Coach are perfect for individual skill building."
        : "हमारे कई टूल्स जोड़ों के लिए डिज़ाइन किए गए हैं! इंटरेस्ट ओवरलैप फाइंडर, फाइट मॉडरेटर, और एनिवर्सरी आइडियास एक साथ उपयोग करने पर बेहतरीन काम करते हैं।"
    },
    {
      question: isEnglish ? "Is there customer support available?" : "क्या ग्राहक सहायता उपलब्ध है?",
      answer: isEnglish
        ? "Yes! We offer 24/7 customer support through chat and email. Our team is trained to handle sensitive topics with discretion and professionalism."
        : "हां! हम चैट और ईमेल के माध्यम से 24/7 ग्राहक सहायता प्रदान करते हैं। हमारी टीम संवेदनशील विषयों को विवेक और व्यावसायिकता के साथ संभालने के लिए प्रशिक्षित है।"
    }
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
          {isEnglish ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          {isEnglish 
            ? 'Got questions? We have answers. Learn more about how our AI tools can enhance your relationships.'
            : 'प्रश्न हैं? हमारे पास उत्तर हैं। जानें कि हमारे AI टूल्स आपके रिश्तों को कैसे बेहतर बना सकते हैं।'
          }
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="glass-card border-none"
            >
              <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-naughty-pink transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-300 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
