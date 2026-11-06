import React, { useState } from 'react';
import { AuthProvider } from './lib/auth/AuthContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { TourStudio } from './components/TourStudio.tsx';
import { TourPlayer } from './components/TourPlayer.tsx';
import { TourLibrary } from './components/TourLibrary.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { Tour } from './lib/types.ts';
import { SAMPLE_TOURS } from './lib/tours/sampleTours.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'library'>('studio');
  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // When a tour is generated from studio
  const handleTourGenerated = (tour: Tour) => {
    setActiveTour(tour);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // When a sample tour is clicked
  const handleExploreSample = (tourId: string) => {
    const found = SAMPLE_TOURS.find(t => t.id === tourId);
    if (found) {
      setActiveTour(found);
      setActiveTab('studio');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleSelectTourFromLibrary = (tour: Tour) => {
    setActiveTour(tour);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
        
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
          }}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {activeTab === 'studio' && (
            activeTour ? (
              <TourPlayer
                tour={activeTour}
                onBackToStudio={() => setActiveTour(null)}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            ) : (
              <TourStudio
                onTourGenerated={handleTourGenerated}
                onExploreSample={handleExploreSample}
              />
            )
          )}

          {activeTab === 'library' && (
            <TourLibrary
              onSelectTour={handleSelectTourFromLibrary}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-slate-300">EchoGuide</span>
              <span>·</span>
              <span>Personal Audio Walking Tours for Historic Places & Cities</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span>Explore History, Sights & Local Culture</span>
              <span>·</span>
              <span>Listen at Your Own Walking Pace</span>
            </div>
          </div>
        </footer>

        {/* Authentication Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />

      </div>
    </AuthProvider>
  );
}
