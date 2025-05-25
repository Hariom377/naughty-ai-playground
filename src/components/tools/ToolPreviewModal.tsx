
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ToolPreviewModalProps {
  tool: any;
  isOpen: boolean;
  onClose: () => void;
}

const ToolPreviewModal: React.FC<ToolPreviewModalProps> = ({ tool, isOpen, onClose }) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  if (!tool) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-card border-naughty-pink/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {tool.icon}
            {tool.title}
            {tool.isPremium && (
              <span className="text-xs bg-naughty-purple px-2 py-1 rounded-full text-white">
                ✦ Premium
              </span>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {tool.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <h4 className="font-semibold mb-2 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-naughty-pink" />
            {isEnglish ? 'What this tool does:' : 'यह टूल क्या करता है:'}
          </h4>
          <p className="text-sm text-gray-400 mb-4">
            {tool.preview}
          </p>
          
          <div className="flex gap-2">
            <Button asChild className="flex-1 romantic-button">
              <Link to={tool.to} className="flex items-center gap-2">
                {isEnglish ? 'Try Now' : 'अभी आज़माएं'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" onClick={onClose}>
              {isEnglish ? 'Close' : 'बंद करें'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolPreviewModal;
