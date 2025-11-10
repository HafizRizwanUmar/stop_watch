import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Reusable SVG Icons (No changes) ---
const IconPlay = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
);
const IconPause = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
);
const IconStop = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>
);
const IconSettings = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826 3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const IconFullscreen = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m0 0l-5 5m11-1v4h-4m0 0l5 5M4 16v4h4m0 0l-5-5m11 5v-4h-4m0 0l5 5" /></svg>
);

// --- Helper: Form Input Component ---
function FormInput({ label, value, onChange, placeholder, className = '', type = 'text', min, step }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>}
      <input
        type={type}
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        // Use default 'font-sans'. If you installed @tailwindcss/forms, remove 'bg-gray-900 border-gray-700'
        className="block w-full rounded-lg bg-gray-900 border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}

// --- Helper: Form Layout Components ---
function FormSection({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// --- 1. The Minimalist Clock Component ---
function MinimalistClock({ timeInMs, title3, title3FontSize }) {
  const totalSeconds = Math.max(0, Math.floor(timeInMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');

  return (
    <div className="flex flex-col items-center">
      {/* The Clock - Use the 'serif' display font */}
      <div
        className="text-8xl md:text-9xl font-light text-white/90 font-serif" // Added font-serif
      >
        {formattedTime}
      </div>

      {/* Title 3 (Under Clock) - Use 'sans-serif' for readability */}
      {title3 && (
        <h3
          className="font-sans mt-4 text-white/90 [text-shadow:_0_1px_3px_rgb(0_0_0_/_50%)]"
          style={{ fontSize: `${title3FontSize}px` }}
        >
          {title3}
        </h3>
      )}
    </div>
  );
}

// --- 2. The Main Display Component (Simplified Layout) ---
function CountdownDisplay({
  // Config Props
  staticBackground,
  title1, title2,
  // Style Props
  title1FontSize, title2FontSize,
  // Component Props
  clockProps,
  // Control Props
  isPreview = false, isRunning,
  onPreviewStart, onPreviewStop, onPreviewReset,
  onExit, onToggleFullscreen
}) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center gap-16 p-4 md:p-10 text-white overflow-hidden font-sans" // Apply 'font-sans' as the default
      style={{
        // Strengthened overlay for better contrast
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${staticBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* --- PREVIEW-ONLY CONTROLS --- */}
      {isPreview && (
        <div className="absolute top-4 left-4 z-20 flex gap-2 backdrop-blur-sm bg-black/30 p-2 rounded-lg">
          <button onClick={onPreviewStart} className="px-3 py-1 bg-green-600 rounded flex items-center gap-1"><IconPlay /> Start</button>
          <button onClick={onPreviewStop} className="px-3 py-1 bg-red-600 rounded flex items-center gap-1"><IconPause /> Stop</button>
          <button onClick={onPreviewReset} className="px-3 py-1 bg-gray-600 rounded flex items-center gap-1"><IconStop /> Reset</button>
        </div>
      )}

      {/* --- LIVE-ONLY CONTROL BUTTONS --- */}
      {!isPreview && (
        <div className="absolute top-4 right-4 z-20 flex gap-4">
          <button
            onClick={onToggleFullscreen}
            className="p-2 bg-black/30 rounded-full hover:bg-black/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
            title="Toggle Fullscreen"
          >
            <IconFullscreen />
          </button>
          <button
            onClick={onExit}
            className="p-2 bg-black/30 rounded-full hover:bg-black/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
            title="Back to Settings"
          >
            <IconSettings />
          </button>
        </div>
      )}

      {/* --- Top Titles - Use the 'serif' display font --- */}
      <div className="w-full text-center z-10 [text-shadow:_0_2px_4px_rgb(0_0_0_/_70%)] font-serif">
        {title1 && (
          <h1
            className="font-bold" // Use 'font-bold' from Playfair Display
            style={{ fontSize: `${title1FontSize}px` }}
          >
            {title1}
          </h1>
        )}
        {title2 && (
          <h2
            className="font-bold" // Use 'font-bold' from Playfair Display
            style={{ fontSize: `${title2FontSize}px`, opacity: 0.8 }}
          >
            {title2}
          </h2>
        )}
      </div>

      {/* --- Main Content: The Minimalist Clock --- */}
      <div className="w-full flex items-center justify-center z-10">
        <MinimalistClock {...clockProps} />
      </div>

    </div>
  );
}


// --- 3. Main App Component (Simplified) ---

// --- ⬇️ EDIT YOUR STATIC ASSETS HERE ⬇️ ---
const STATIC_BACKGROUND = '/background.png'; // Place in /public/background.png
// --- ⬆️ EDIT YOUR STATIC ASSETS HERE ⬆️ ---


export default function App() {
  const [mode, setMode] = useState('setup'); // 'setup' or 'running'

  // --- General Settings ---
  const [countdownMinutes, setCountdownMinutes] = useState(60);
  const [title1, setTitle1] = useState('Main Event Starting Soon');
  const [title2, setTitle2] = useState('Get Ready');
  const [title3, setTitle3] = useState('We are live in...');

  // --- Styling (Sizes Only) ---
  const [title1FontSize, setTitle1FontSize] = useState(48); // Increased default for 'Playfair Display'
  const [title2FontSize, setTitle2FontSize] = useState(30); // Increased default
  const [title3FontSize, setTitle3FontSize] = useState(18);

  // --- Timer State ---
  const [time, setTime] = useState(countdownMinutes * 60 * 1000);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const appContainerRef = useRef(null);

  // --- POLISHED Timer Logic (Countdown) ---
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          // Check if 1 second (1000ms) or less is left
          if (prevTime <= 1000) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          // Subtract 1 second (1000ms)
          return prevTime - 1000;
        });
      }, 1000); // Tick every 1 second (1000ms)
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // --- Handlers ---
  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(countdownMinutes * 60 * 1000);
  }, [countdownMinutes]); // ✅ FIX: Added dependency

  const togglePlay = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []); // ✅ FIX: Empty dependency array is correct

  // --- LIVE Keyboard Listener (Hardcoded Keys) ---
  useEffect(() => {
    if (mode !== 'running') return;

    const handleKeyDown = (e) => {
      // Spacebar toggles Play/Pause
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
      // 'r' key resets
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, isRunning, handleReset, togglePlay]); // ✅ FIX: Added dependencies


  const handleLaunch = () => {
    handleReset();
    setMode('running');
    handleToggleFullscreen(true); // Force fullscreen on launch
  };

  const handleToggleFullscreen = (forceEnable = false) => {
    if (!appContainerRef.current) return;
    if (forceEnable === true && !document.fullscreenElement) {
      appContainerRef.current.requestFullscreen();
    } else if (!document.fullscreenElement) {
      appContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // --- Dynamic Prop Bundling ---
  const clockProps = {
    timeInMs: time,
    title3,
    title3FontSize,
  };

  const displayProps = {
    staticBackground: STATIC_BACKGROUND,
    title1, title2,
    title1FontSize, title2FontSize,
    clockProps, isRunning,
  };

  // --- RENDER ---
  if (mode === 'running') {
    return (
      <div ref={appContainerRef} className="w-screen h-screen">
        <CountdownDisplay
          {...displayProps}
          isPreview={false}
          onExit={() => setMode('setup')}
          onToggleFullscreen={() => handleToggleFullscreen()}
        />
      </div>
    );
  }

  return (
    // Set 'font-sans' as the default for the entire setup UI
    <div ref={appContainerRef} className="flex h-screen w-screen bg-gray-900 text-white font-sans">
      {/* --- Left Pane: Preview --- */}
      <div className="flex-1 bg-gray-800 h-full overflow-hidden">
        <CountdownDisplay
          {...displayProps}
          // Ensure preview resets to full time when 'countdownMinutes' changes
          clockProps={{
            ...clockProps,
            timeInMs: isRunning || time !== (countdownMinutes * 60 * 1000) ? time : (countdownMinutes * 60 * 1000),
          }}
          isPreview={true}
          onPreviewStart={() => setIsRunning(true)}
          onPreviewStop={() => setIsRunning(false)}
          onPreviewReset={handleReset}
        />
      </div>

      {/* --- Right Pane: Simplified Settings --- */}
      <div className="w-[420px] h-full flex flex-col bg-gray-950 border-l border-gray-700">
        <h2 className="text-2xl font-bold p-6 text-center border-b border-gray-700 flex-shrink-0">
          Stream Settings
        </h2>

        {/* --- Settings Content --- */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">

          <FormSection title="Timer">
            <FormInput
              label="Countdown (in minutes)"
              type="number"
              min="0"
              step="0.1"
              value={countdownMinutes}
              onChange={(val) => {
                const newMinutes = parseFloat(val) || 0;
                setCountdownMinutes(newMinutes);
                if (!isRunning) {
                  setTime(newMinutes * 60 * 1000);
                }
              }}
            />
          </FormSection>

          <FormSection title="Titles">
            <FormInput label="Title 1 (Top)" value={title1} onChange={setTitle1} />
            <FormInput label="Title 2 (Top)" value={title2} onChange={setTitle2} />
            <FormInput label="Title 3 (Under Clock)" value={title3} onChange={setTitle3} />
          </FormSection>

          <FormSection title="Title Styling">
            <FormInput
              label="Title 1 Size (px)"
              type="number"
              value={title1FontSize}
              onChange={(val) => setTitle1FontSize(Number(val) || 0)} // Added '|| 0' to prevent NaN
            />
            <FormInput
              label="Title 2 Size (px)"
              type="number"
              value={title2FontSize}
              onChange={(val) => setTitle2FontSize(Number(val) || 0)}
            />
            <FormInput
              label="Title 3 Size (px)"
              type="number"
              value={title3FontSize}
              onChange={(val) => setTitle3FontSize(Number(val) || 0)}
            />
          </FormSection>

        </div>

        {/* --- Launch Button (Sticky Footer) --- */}
        <div className="p-6 border-t border-gray-700 flex-shrink-0">
          <button
            onClick={handleLaunch}
            className="w-full py-3 px-6 bg-green-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-all duration-150"
          >
            🚀 Launch Overlay
          </button>
        </div>
      </div>
    </div>
  );
}