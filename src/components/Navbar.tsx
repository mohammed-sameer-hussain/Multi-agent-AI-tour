import React, { useState } from 'react';
import { Headphones, Compass, BookOpen, Sparkles, User as UserIcon, LogOut, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../lib/auth/AuthContext.tsx';

interface NavbarProps {
  activeTab: 'studio' | 'library' | 'architecture';
  setActiveTab: (tab: 'studio' | 'library' | 'architecture') => void;
  onOpenAuth: () => void;
}

export function Navbar({ activeTab, setActiveTab, onOpenAuth }: NavbarProps) {
  const { user, logout, loginDemo } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setActiveTab('studio')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md shadow-amber-950/40">
              <Headphones className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                EchoGuide
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono block text-amber-400/90 font-medium">
                Multi-Agent Audio
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'studio'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Tour Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'library'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Tour Library</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'architecture'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Architecture & README</span>
            </button>
          </nav>
        </div>

        {/* Right Actions & User Profile */}
        <div className="flex items-center gap-3">
          {/* Engine indicator */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Gemini 2.5 Multi-Agent</span>
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-sm font-medium text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-amber-600/30 text-amber-300 flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="max-w-[120px] truncate">{user.name}</span>
              </button>

              {dropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-lg bg-slate-900 border border-slate-800 shadow-xl py-2 z-50 text-xs text-slate-300">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="font-semibold text-white truncate">{user.name}</p>
                      <p className="text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setActiveTab('library');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-800/80 flex items-center gap-2 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>My Saved Tours ({user.savedTourIds?.length || 0})</span>
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 flex items-center gap-2 transition-colors border-t border-slate-800/60 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => loginDemo('explorer')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/40 border border-amber-800/60 hover:bg-amber-900/40 transition-colors"
                title="Sign in with sample account"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>1-Click Demo</span>
              </button>
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-md text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav tabs */}
      <div className="md:hidden flex items-center border-t border-slate-900 px-4 py-2 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-3 py-1 text-xs rounded font-medium ${
            activeTab === 'studio' ? 'bg-slate-800 text-white' : 'text-slate-400'
          }`}
        >
          Studio
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`px-3 py-1 text-xs rounded font-medium ${
            activeTab === 'library' ? 'bg-slate-800 text-white' : 'text-slate-400'
          }`}
        >
          Library
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-3 py-1 text-xs rounded font-medium ${
            activeTab === 'architecture' ? 'bg-slate-800 text-white' : 'text-slate-400'
          }`}
        >
          Architecture & README
        </button>
      </div>
    </header>
  );
}
