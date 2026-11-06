import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Compass, Clock, MapPin, Play, Bookmark, BookmarkCheck, Sparkles, Filter } from 'lucide-react';
import { Tour, InterestCategory } from '../lib/types.ts';
import { useAuth } from '../lib/auth/AuthContext.tsx';
import { SAMPLE_TOURS } from '../lib/tours/sampleTours.ts';

interface TourLibraryProps {
  onSelectTour: (tour: Tour) => void;
  onOpenAuth: () => void;
}

export function TourLibrary({ onSelectTour, onOpenAuth }: TourLibraryProps) {
  const { user, isTourSaved, toggleSaveTour } = useAuth();
  const [tours, setTours] = useState<Tour[]>(SAMPLE_TOURS);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | InterestCategory | 'Saved'>('All');

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await fetch('/api/tours');
        if (res.ok) {
          const data = await res.json();
          if (data.tours && data.tours.length > 0) {
            setTours(data.tours);
          }
        }
      } catch (err) {
        console.warn('Error fetching tours from server:', err);
      }
    }
    fetchTours();
  }, []);

  const filteredTours = tours.filter((t) => {
    // Search query match
    const query = search.toLowerCase();
    const matchesSearch = 
      t.title.toLowerCase().includes(query) ||
      t.location.toLowerCase().includes(query) ||
      t.summary.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    // Filter match
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Saved') {
      return isTourSaved(t.id);
    }
    return t.interests.includes(selectedFilter);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-1">
            Audio Archive
          </span>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
            Explore Audio Tour Library
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Browse expertly curated historical and cultural walks or re-listen to your custom generated itineraries.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city, landmark, or topic..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800/80">
        {(['All', 'Saved', 'History', 'Architecture', 'Culture', 'Culinary'] as const).map((filter) => {
          const isActive = selectedFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => {
                if (filter === 'Saved' && !user) {
                  onOpenAuth();
                  return;
                }
                setSelectedFilter(filter);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {filter === 'Saved' && <Bookmark className="w-3.5 h-3.5" />}
              <span>{filter}</span>
              {filter === 'Saved' && user && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-amber-300">
                  {user.savedTourIds?.length || 0}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid of Tours */}
      {filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => {
            const saved = isTourSaved(tour.id);
            return (
              <div
                key={tour.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[11px] font-mono text-amber-400 font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{tour.location}</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!user) {
                          onOpenAuth();
                          return;
                        }
                        toggleSaveTour(tour.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                      title={saved ? 'Remove from saved' : 'Save to library'}
                    >
                      {saved ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {tour.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {tour.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{tour.estimatedListeningTime || `${tour.durationMinutes} min`}</span>
                    </span>
                    <span>{tour.sections.length} chapters</span>
                  </div>

                  <button
                    onClick={() => onSelectTour(tour)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 group-hover:bg-amber-500 text-slate-200 group-hover:text-slate-950 border border-slate-800 group-hover:border-amber-400 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Listen to Tour</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-8">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-200">No tours match your filter</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {selectedFilter === 'Saved' 
              ? 'You have not bookmarked any tours yet. Click the bookmark icon on any tour to save it.' 
              : 'Try clearing your search keyword or switching category filters.'}
          </p>
        </div>
      )}

    </div>
  );
}
