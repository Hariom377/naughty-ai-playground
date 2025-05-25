
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQSection = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  const faqs = [
    {
      question: isEnglish ? 'Is NaughtyyAI safe and private?' : 'क्या NaughtyyAI सुरक्षित और निजी है?',
      answer: isEnglish ? 'Yes, we prioritize your privacy. All conversations are encrypted and not stored permanently. We use advanced AI technology while maintaining strict privacy standards.' : 'हां, हम आपकी गोपनीयता को प्राथमिकता देते हैं। सभी बातचीत एन्क्रिप्टेड हैं।'
    },
    {
      question: isEnglish ? 'What makes NaughtyyAI different from other relationship apps?' : 'NaughtyyAI को अन्य रिश्ते ऐप्स से क्या अलग बनाता है?',
      answer: isEnglish ? 'We offer specialized AI tools designed specifically for intimate relationships, with advanced language models trained on relationship psychology and communication patterns.' : 'हम अंतरंग रिश्तों के लिए विशेष रूप से डिज़ाइन किए गए विशेष AI उपकरण प्रदान करते हैं।'
    },
    {
      question: isEnglish ? 'Do I need to pay for all features?' : 'क्या मुझे सभी सुविधाओं के लिए भुगतान करना होगा?',
      answer: isEnglish ? 'Many tools are free to use. Premium features offer advanced capabilities and unlimited usage. You can try most tools without any payment.' : 'कई उपकरण उपयोग के लिए निःशुल्क हैं। प्रीमियम सुविधाएं उन्नत क्षमताएं प्रदान करती हैं।'
    },
    {
      question: isEnglish ? 'Is the content appropriate for all couples?' : 'क्या सामग्री सभी जोड़ों के लिए उपयुक्त है?',
      answer: isEnglish ? 'Our tools are designed for adults and can be customized based on comfort levels. You have full control over the type and intensity of content generated.' : 'हमारे उपकरण वयस्कों के लिए डिज़ाइन किए गए हैं और आराम के स्तर के आधार पर अनुकूलित किए जा सकते हैं।'
    },
    {
      question: isEnglish ? 'How accurate is the AI advice?' : 'AI सलाह कितनी सटीक है?',
      answer: isEnglish ? 'Our AI is trained on relationship psychology and communication research. While helpful, it should complement, not replace, professional relationship counseling when needed.' : 'हमारा AI रिश्ते मनोविज्ञान और संचार अनुसंधान पर प्रशिक्षित है।'
    }
  ];

  return (
    <section className="w-full px-4 mb-16" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto">
        <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-center mb-8 romantic-title">
          {isEnglish ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-naughty-pink/20">
              <AccordionTrigger className="text-left text-white hover:text-naughty-pink transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 leading-relaxed">
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
