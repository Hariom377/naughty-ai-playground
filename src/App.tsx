
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { UserProvider } from '@/contexts/UserContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import HomePage from '@/pages/HomePage';
import SextingGeneratorPage from '@/pages/SextingGeneratorPage';
import DirtyTalkIdeasPage from '@/pages/DirtyTalkIdeasPage';
import EroticChatPage from '@/pages/EroticChatPage';
import AnniversaryIdeasPage from '@/pages/AnniversaryIdeasPage';
import FirstDateIdeasPage from '@/pages/FirstDateIdeasPage';
import RandomAdventureWheelPage from '@/pages/RandomAdventureWheelPage';
import InterestOverlapFinderPage from '@/pages/InterestOverlapFinderPage';
import TextCprPage from '@/pages/TextCprPage';
import FlirtCoachPage from '@/pages/FlirtCoachPage';
import SocialSpyPage from '@/pages/SocialSpyPage';
import FightModeratorPage from '@/pages/FightModeratorPage';
import LoveLanguageDecoderPage from '@/pages/LoveLanguageDecoderPage';
import LoveNoteGeneratorPage from '@/pages/LoveNoteGeneratorPage';
import ConfessionLetterPage from '@/pages/ConfessionLetterPage';
import ExDetoxPage from '@/pages/ExDetoxPage';
import VoiceMessageMoodPage from '@/pages/VoiceMessageMoodPage';
import CouplesQuizPage from '@/pages/CouplesQuizPage';
import GiftTranslatorPage from '@/pages/GiftTranslatorPage';
import EmotionTranslatorPage from '@/pages/EmotionTranslatorPage';
import MindReaderModePage from '@/pages/MindReaderModePage';
import FirstTimeScriptGeneratorPage from '@/pages/FirstTimeScriptGeneratorPage';
import NoShameIntimacyFaqPage from '@/pages/NoShameIntimacyFaqPage';
import FamilyQaSimulatorPage from '@/pages/FamilyQaSimulatorPage';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/sexting-generator" element={<SextingGeneratorPage />} />
              <Route path="/dirty-talk-ideas" element={<DirtyTalkIdeasPage />} />
              <Route path="/erotic-chat" element={<EroticChatPage />} />
              <Route path="/voice-message-mood" element={<VoiceMessageMoodPage />} />
              <Route path="/couples-quiz" element={<CouplesQuizPage />} />
              <Route path="/gift-translator" element={<GiftTranslatorPage />} />
              <Route path="/emotion-translator" element={<EmotionTranslatorPage />} />
              <Route path="/mind-reader-mode" element={<MindReaderModePage />} />
              <Route path="/first-time-script-generator" element={<FirstTimeScriptGeneratorPage />} />
              <Route path="/no-shame-intimacy-faq" element={<NoShameIntimacyFaqPage />} />
              <Route path="/family-qa-simulator" element={<FamilyQaSimulatorPage />} />
              <Route path="/anniversary-ideas" element={<AnniversaryIdeasPage />} />
              <Route path="/first-date-ideas" element={<FirstDateIdeasPage />} />
              <Route path="/random-adventure-wheel" element={<RandomAdventureWheelPage />} />
              <Route path="/interest-overlap-finder" element={<InterestOverlapFinderPage />} />
              <Route path="/text-cpr" element={<TextCprPage />} />
              <Route path="/flirt-coach" element={<FlirtCoachPage />} />
              <Route path="/social-spy" element={<SocialSpyPage />} />
              <Route path="/fight-moderator" element={<FightModeratorPage />} />
              <Route path="/love-language-decoder" element={<LoveLanguageDecoderPage />} />
              <Route path="/love-note-generator" element={<LoveNoteGeneratorPage />} />
              <Route path="/confession-letter" element={<ConfessionLetterPage />} />
              <Route path="/ex-detox" element={<ExDetoxPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
