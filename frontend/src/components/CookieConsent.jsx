import React, { useState, useEffect } from 'react';
import { Cookie, Shield, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: true,
    functional: true,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cyboglabs_cookie_consent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // If user accepted, track the visit
      const consent = JSON.parse(cookieConsent);
      if (consent.analytics) {
        trackVisitor();
      }
    }
  }, []);

  const trackVisitor = async () => {
    try {
      const visitorData = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        referrer: document.referrer || 'direct',
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      await fetch(`${backendUrl}/api/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorData),
      });
    } catch (error) {
      console.log('Visitor tracking skipped');
    }
  };

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      functional: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cyboglabs_cookie_consent', JSON.stringify(consent));
    setShowBanner(false);
    trackVisitor();
  };

  const handleDeclineAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      functional: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cyboglabs_cookie_consent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cyboglabs_cookie_consent', JSON.stringify(consent));
    setShowBanner(false);
    if (preferences.analytics) {
      trackVisitor();
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" />
      
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
          {/* Main Banner */}
          {!showDetails ? (
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                  }}
                >
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                    By clicking "Accept All", you consent to our use of cookies. You can also customize your preferences 
                    or decline non-essential cookies.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                      }}
                    >
                      <Check size={16} />
                      Accept All
                    </button>
                    
                    <button
                      onClick={handleDeclineAll}
                      className="px-6 py-2.5 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <X size={16} />
                      Decline All
                    </button>
                    
                    <button
                      onClick={() => setShowDetails(true)}
                      className="px-6 py-2.5 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-all duration-300"
                    >
                      Customize
                    </button>
                  </div>
                  
                  <p className="text-xs text-neutral-500 mt-4">
                    By continuing to use this site, you agree to our{' '}
                    <Link to="/privacy" className="text-rose-500 hover:underline">Privacy Policy</Link>
                    {' '}and{' '}
                    <Link to="/terms" className="text-rose-500 hover:underline">Terms of Service</Link>.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Detailed Preferences */
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-neutral-700" />
                  <h3 className="text-xl font-bold text-neutral-900">Cookie Preferences</h3>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-neutral-500" />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900">Necessary Cookies</h4>
                    <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Always Active
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600">
                    These cookies are essential for the website to function properly. They enable basic functions 
                    like page navigation and access to secure areas. The website cannot function properly without these cookies.
                  </p>
                </div>
                
                {/* Analytics Cookies */}
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900">Analytics Cookies</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-rose-400 peer-checked:to-amber-400"></div>
                    </label>
                  </div>
                  <p className="text-sm text-neutral-600">
                    These cookies help us understand how visitors interact with our website. We collect anonymous 
                    data about page views, traffic sources, and user behavior to improve our services.
                  </p>
                </div>
                
                {/* Functional Cookies */}
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900">Functional Cookies</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-rose-400 peer-checked:to-amber-400"></div>
                    </label>
                  </div>
                  <p className="text-sm text-neutral-600">
                    These cookies enable enhanced functionality and personalization, such as remembering your 
                    preferences, chat history, and customized settings for a better experience.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-2.5 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                  }}
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-2.5 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-all duration-300"
                >
                  Accept All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
