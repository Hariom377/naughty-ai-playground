
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: Array<{ id: string; name: string; }>;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories
}) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <div className="w-full px-4 py-8">
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder={isEnglish ? 'Search tools...' : 'टूल्स खोजें...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 romantic-input w-full"
              aria-label={isEnglish ? 'Search tools' : 'टूल्स खोजें'}
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap transition-all duration-200 hover:scale-105"
              >
                <Filter className="w-4 h-4 mr-1" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
