import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- Reusable SVG Icons ---
// (Original icons: ChevronDown, Play, Pause, Stop, Settings, Fullscreen, Upload)
const IconChevronDown = () => (
  <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
);
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
const IconUpload = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
);

// --- NEW Icons for Tabs & UI ---
const IconCog = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826 3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const IconPalette = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h10a2 2 0 002-2V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4z" /></svg>
);
const IconKeyboard = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-3m-1 14v-5m-4 0v5m-4 0v5m12 0v5m-4 0v5m-4 0v5M8 7h8v5H8z" /></svg>
);
const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);
const IconTrash = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

// --- Helper: Key Capture Input (Restyled) ---
function KeyCaptureInput({ label, value, onKeySet }) {
  const [isCapturing, setIsCapturing] = useState(false);
  const handleKeyDown = (e) => {
    e.preventDefault();
    onKeySet(e.key);
    setIsCapturing(false);
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400">{label}</label>
      <button
        type="button"
        onFocus={() => setIsCapturing(true)}
        onBlur={() => setIsCapturing(false)}
        onKeyDown={isCapturing ? handleKeyDown : undefined}
        className="mt-1 w-full p-2.5 border border-gray-700 rounded-lg shadow-sm text-center font-mono text-lg bg-gray-900 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {isCapturing ? 'Press a key...' : (value ? `"${value}"` : 'Click to set')}
      </button>
    </div>
  );
}

// --- Helper: Form Input Component (Restyled) ---
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
        className="block w-full rounded-lg bg-gray-900 border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}

// --- Helper: File Input Component (Restyled) ---
function FileInput({ label, onChange, fileType = "image/*" }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const fileUrl = URL.createObjectURL(file);
      onChange(fileUrl); // Pass the object URL back
      e.target.value = null; // Reset file input for re-upload
    }
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={fileType}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="w-full flex items-center justify-center p-2.5 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <IconUpload />
        <span className="truncate">{fileName || 'Choose file...'}</span>
      </button>
    </div>
  );
}

// --- Helper: Form Layout Components (NEW) ---
function FormSection({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FormRow({ children }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {children}
    </div>
  );
}

// --- 1. The Flip Clock Unit Component (Unchanged) ---
function FlipUnit({ digit, label, timerFont }) {
  const currentDigit = digit.toString().padStart(2, '0');
  // Logic fix: prevDigit should be the *previous* number, not next
  const prevDigit = (digit === 0) 
    ? (label === 'Hours' ? '23' : '59') 
    : (digit - 1).toString().padStart(2, '0');
  
  // Animation fix: Use the 'currentDigit' as the key to trigger animation
  // when the *value changes*.
  const prevDigitForAnimation = (digit === 0) 
    ? (label === 'Hours' ? '23' : '59') 
    : (digit - 1).toString().padStart(2, '0');
  
  // Corrected logic for flip: The 'previous' number (what was just shown)
  // is the one that flips *down* to reveal the 'current' one.
  // The provided code had this slightly backwards, animating 'prevDigit' (next number)
  // Let's correct the animation values.
  const oldDigit = (digit === 59 || digit === 99) ? '00' : (digit + 1).toString().padStart(2, '0');


  return (
    <div className="flex flex-col items-center">
      {/* Glassmorphic Flip Unit */}
      <div
        className="relative w-24 h-32 md:w-32 md:h-48 text-8xl md:text-9xl rounded-lg
                   bg-black/20 backdrop-blur-md border border-white/10 shadow-xl"
        style={{ fontFamily: timerFont }}
      >
        {/* Static Background Number (Current) */}
        <div className="absolute inset-0 flex items-center justify-center text-white/80">
          {currentDigit}
        </div>
        
        {/* Flipping Top Half (Shows OLD number, flips down) */}
        <div
          key={currentDigit} // Re-trigger animation
          className="absolute top-0 left-0 w-full h-1/2 bg-black/30 text-white rounded-t-lg overflow-hidden
                     flex items-center justify-center
                     origin-bottom [transform:rotateX(0deg)] [backface-visibility:hidden]
                     animate-flip-top"
        >
          {oldDigit}
        </div>

        {/* Static Top Half (Shows CURRENT number) */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-transparent text-white rounded-t-lg overflow-hidden
                        flex items-center justify-center">
          {currentDigit}
        </div>

        {/* Flipping Bottom Half (Shows OLD number) */}
        <div
          key={currentDigit}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-black/20 text-white/80 rounded-b-lg overflow-hidden
                     flex items-center justify-center
                     origin-top [transform:rotateX(180deg)] [backface-visibility:hidden]
                     animate-flip-bottom"
        >
          {oldDigit}
        </div>

        {/* Static Bottom Half (Shows CURRENT number) */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-transparent text-white/80 rounded-b-lg overflow-hidden
                        flex items-center justify-center">
          {currentDigit}
        </div>

        {/* The "Fold" */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-black/50" style={{ transform: 'translateY(-0.5px)' }} />
      </div>
    </div>
  );
}


// --- 2. The Main Flip Clock (Unchanged) ---
function FlipClock({ timeInMs, timerFont, title3, title3Font, title3FontSize }) {
  const totalSeconds = Math.max(0, Math.floor(timeInMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="flex flex-col items-center">
      {/* The Clock */}
      <div className="flex justify-center gap-4 md:gap-8 [perspective:1000px]">
        <FlipUnit digit={hours} label="Hours" timerFont={timerFont} />
        <span className="text-6xl md:text-8xl pt-12 text-white/50">:</span>
        <FlipUnit digit={minutes} label="Minutes" timerFont={timerFont} />
        <span className="text-6xl md:text-8xl pt-12 text-white/50">:</span>
        <FlipUnit digit={seconds} label="Seconds" timerFont={timerFont} />
      </div>
      
      {/* Title 3 (Under Clock) */}
      {title3 && (
        <h3
          className="font-sans mt-6 text-white/90 [text-shadow:_0_1px_3px_rgb(0_0_0_/_50%)]"
          style={{ fontFamily: title3Font, fontSize: `${title3FontSize}px` }}
        >
          {title3}
        </h3>
      )}
    </div>
  );
}

// --- 3. The Main Display Component (Unchanged) ---
function CountdownDisplay({
  // Config Props
  backgroundStyle, title1, title2, logos = [],
  // Style Props
  title1Font, title1FontSize, title2Font, title2FontSize, 
  logoTagFont, logoTagFontSize,
  // Component Props
  clockProps,
  // Control Props
  isPreview = false, isRunning,
  onPreviewStart, onPreviewStop, onPreviewReset,
  onExit, onToggleFullscreen
}) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-4 md:p-10 text-white overflow-hidden"
      style={backgroundStyle} // <-- DYNAMIC BACKGROUND
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

      {/* --- Top Titles --- */}
      <div className="w-full text-center z-10 [text-shadow:_0_2px_4px_rgb(0_0_0_/_70%)]">
        {title1 && (
          <h1
            className="font-sans font-bold"
            style={{ fontFamily: title1Font, fontSize: `${title1FontSize}px` }}
          >
            {title1}
          </h1>
        )}
        {title2 && (
          <h2
            className="font-sans"
            style={{ fontFamily: title2Font, fontSize: `${title2FontSize}px`, opacity: 0.8 }}
          >
            {title2}
          </h2>
        )}
      </div>

      {/* --- Main Content: The Flip Clock (with Title 3) --- */}
      <div className="w-full flex items-center justify-center z-10">
        <FlipClock {...clockProps} />
      </div>

      {/* --- Logos (Bottom) --- */}
      <div className="w-full flex flex-wrap justify-center items-end gap-x-8 gap-y-4 z-10">
        {logos.map((logo, index) => (
          <div key={index} className="flex flex-col items-center [text-shadow:_0_1px_3px_rgb(0_0_0_/_50%)]">
            <img
              src={logo.url} // <-- Now an object URL
              alt={logo.tag}
              className="max-h-12 max-w-[120px] object-contain drop-shadow-md"
            />
            <p
              className="font-sans font-bold mt-1"
              style={{ fontFamily: logoTagFont, fontSize: `${logoTagFontSize}px` }}
            >
              {logo.tag}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Tabbed Settings Config (NEW) ---
const TABS = [
  { id: 'general', name: 'General', icon: <IconCog /> },
  { id: 'appearance', name: 'Appearance', icon: <IconPalette /> },
  { id: 'controls', name: 'Controls', icon: <IconKeyboard /> },
  { id: 'sponsors', name: 'Sponsors', icon: <IconUsers /> },
];

// --- 4. Main App Component (Restructured) ---
export default function App() {
  const [mode, setMode] = useState('setup'); // 'setup' or 'running'
  const [activeTab, setActiveTab] = useState('general'); // NEW: For settings tabs

  // --- General Settings ---
  const [countdownMinutes, setCountdownMinutes] = useState(60);
  const [title1, setTitle1] = useState('Main Event Starting Soon');
  const [title2, setTitle2] = useState('Get Ready');
  const [title3, setTitle3] = useState('We are live in...');
  
  // --- Background Settings ---
  const [backgroundType, setBackgroundType] = useState('gradient'); // solid, gradient, image
  const [backgroundColor1, setBackgroundColor1] = useState('#111827'); // dark gray
  const [backgroundColor2, setBackgroundColor2] = useState('#374151'); // lighter gray
  const [gradientDirection, setGradientDirection] = useState('to bottom right');
  const [backgroundImage, setBackgroundImage] = useState(''); // Will hold object URL

  // --- Controls ---
  const [startKey, setStartKey] = useState('');
  const [stopKey, setStopKey] = useState('');
  const [resetKey, setResetKey] = useState('');

  // --- Logos ---
  const [logos, setLogos] = useState([]); // Will be [{ tag: 'Sponsor', url: 'blob:...' }]
  const [newLogoTag, setNewLogoTag] = useState('Sponsor');

  // --- Styling ---
  const [timerFont, setTimerFont] = useState("'Bebas Neue', sans-serif");
  const [title1Font, setTitle1Font] = useState("'Roboto', sans-serif");
  const [title1FontSize, setTitle1FontSize] = useState(36);
  const [title2Font, setTitle2Font] = useState("'Roboto', sans-serif");
  const [title2FontSize, setTitle2FontSize] = useState(24);
  const [title3Font, setTitle3Font] = useState("'Roboto', sans-serif");
  const [title3FontSize, setTitle3FontSize] = useState(18);
  const [logoTagFont, setLogoTagFont] = useState("'Roboto', sans-serif");
  const [logoTagFontSize, setLogoTagFontSize] = useState(14);

  // --- Timer State ---
  const [time, setTime] = useState(countdownMinutes * 60 * 1000);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const appContainerRef = useRef(null);

  // --- Timer Logic (Countdown) ---
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 10) { // Check before or at zero
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 10;
        });
      }, 10);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // --- LIVE Keyboard Listener ---
  useEffect(() => {
    if (mode !== 'running') return;
    const handleKeyDown = (e) => {
      if (e.key === startKey) { e.preventDefault(); setIsRunning(true); }
      if (e.key === stopKey) { e.preventDefault(); setIsRunning(false); }
      if (e.key === resetKey) { e.preventDefault(); handleReset(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, startKey, stopKey, resetKey]);

  // --- Handlers (Unchanged logic) ---
  const handleReset = () => {
    setIsRunning(false);
    setTime(countdownMinutes * 60 * 1000);
  };
  
  const handleAddLogo = (fileUrl) => {
    if (!fileUrl) return;
    setLogos([...logos, { url: fileUrl, tag: newLogoTag }]);
    setNewLogoTag('Sponsor'); // Reset tag input
  };

  const handleRemoveLogo = (index) => {
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(logos[index].url);
    setLogos(logos.filter((_, i) => i !== index));
  };
  
  const handleSetBackgroundImage = (fileUrl) => {
    // Revoke previous image if it exists
    if (backgroundImage) {
      URL.revokeObjectURL(backgroundImage);
    }
    setBackgroundImage(fileUrl);
  };
  
  const handleClearBackgroundImage = () => {
    if (backgroundImage) {
      URL.revokeObjectURL(backgroundImage);
    }
    setBackgroundImage('');
  };

  const handleLaunch = () => {
    if (!startKey || !stopKey || !resetKey) {
      alert('Please set all three control keys (Start, Stop, Reset).');
      return;
    }
    if (startKey === stopKey || startKey === resetKey || stopKey === resetKey) {
      alert('Start, Stop, and Reset keys must be unique.');
      return;
    }
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

  // --- Dynamic Prop Bundling (Optimized) ---
  
  // Calculate background style once
  const backgroundStyle = useMemo(() => {
    switch (backgroundType) {
      case 'image':
        return { 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      case 'gradient':
        return { 
          background: `linear-gradient(${gradientDirection}, ${backgroundColor1}, ${backgroundColor2})` 
        };
      case 'solid':
      default:
        return { backgroundColor: backgroundColor1 };
    }
  }, [backgroundType, backgroundImage, backgroundColor1, backgroundColor2, gradientDirection]);
  
  // Bundle all props for the clock
  const clockProps = {
    timeInMs: time,
    timerFont, title3, title3Font, title3FontSize,
  };
  
  // Bundle all props for the main display
  const displayProps = {
    backgroundStyle, title1, title2, logos,
    title1Font, title1FontSize, title2Font, title2FontSize,
    logoTagFont, logoTagFontSize,
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
    <div ref={appContainerRef} className="flex h-screen w-screen bg-gray-900 text-white font-sans">
      {/* --- Left Pane: Preview --- */}
      <div className="flex-1 bg-gray-800 h-full overflow-hidden">
        <CountdownDisplay
          {...displayProps}
          // Fix: Ensure preview resets to full time when 'countdownMinutes' changes
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

      {/* --- Right Pane: Settings (Restructured with Tabs) --- */}
      <div className="w-[420px] h-full flex flex-col bg-gray-950 border-l border-gray-700">
        <h2 className="text-2xl font-bold p-6 text-center border-b border-gray-700 flex-shrink-0">
          Stream Settings
        </h2>
        
        {/* --- Tab Navigation --- */}
        <div className="flex-shrink-0 border-b border-gray-700">
          <nav className="flex -mb-px px-4">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 font-medium text-sm rounded-t-lg
                  ${activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-400'
                    : 'text-gray-400 hover:text-gray-200 border-b-2 border-transparent hover:border-gray-600'
                  }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        
        {/* --- Tab Content --- */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
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
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <FormSection title="Background">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Background Type</label>
                  <select 
                    value={backgroundType} 
                    onChange={(e) => setBackgroundType(e.target.value)}
                    className="block w-full rounded-lg bg-gray-900 border-gray-700 shadow-sm"
                  >
                    <option value="solid">Solid Color</option>
                    <option value="gradient">Gradient</option>
                    <option value="image">Image</option>
                  </select>
                </div>

                {backgroundType === 'solid' && (
                  <FormInput label="Color" type="color" value={backgroundColor1} onChange={setBackgroundColor1} />
                )}
                
                {backgroundType === 'gradient' && (
                  <>
                    <FormInput label="Color 1" type="color" value={backgroundColor1} onChange={setBackgroundColor1} />
                    <FormInput label="Color 2" type="color" value={backgroundColor2} onChange={setBackgroundColor2} />
                    <FormInput label="Direction" value={gradientDirection} onChange={setGradientDirection} placeholder="e.g., to right, 135deg" />
                  </>
                )}
                
                {backgroundType === 'image' && (
                  <>
                    <FileInput label="Upload Image" onChange={handleSetBackgroundImage} />
                    {backgroundImage && (
                      <button onClick={handleClearBackgroundImage} className="w-full p-2 bg-red-800 hover:bg-red-700 rounded-lg text-sm">
                        Clear Image
                      </button>
                    )}
                  </>
                )}
              </FormSection>
              
              <FormSection title="Fonts & Sizing">
                <FormInput label="Clock Font" value={timerFont} onChange={setTimerFont} placeholder="'Bebas Neue', sans-serif" />
                <FormRow>
                  <FormInput label="Title 1 Font" value={title1Font} onChange={setTitle1Font} />
                  <FormInput label="Size (px)" type="number" value={title1FontSize} onChange={e => setTitle1FontSize(Number(e.target.value))} />
                </FormRow>
                <FormRow>
                  <FormInput label="Title 2 Font" value={title2Font} onChange={setTitle2Font} />
                  <FormInput label="Size (px)" type="number" value={title2FontSize} onChange={e => setTitle2FontSize(Number(e.target.value))} />
                </FormRow>
                <FormRow>
                  <FormInput label="Title 3 Font" value={title3Font} onChange={setTitle3Font} />
                  <FormInput label="Size (px)" type="number" value={title3FontSize} onChange={e => setTitle3FontSize(Number(e.target.value))} />
                </FormRow>
                <FormRow>
                  <FormInput label="Logo Tag Font" value={logoTagFont} onChange={setLogoTagFont} />
                  <FormInput label="Size (px)" type="number" value={logoTagFontSize} onChange={e => setLogoTagFontSize(Number(e.target.value))} />
                </FormRow>
              </FormSection>
            </div>
          )}

          {/* Controls Tab */}
          {activeTab === 'controls' && (
            <div className="space-y-6">
              <FormSection title="Keyboard Shortcuts">
                <p className="text-sm text-gray-400">Set the keys to control the timer when it's live.</p>
                <KeyCaptureInput label="START Key" value={startKey} onKeySet={setStartKey} />
                <KeyCaptureInput label="STOP / PAUSE Key" value={stopKey} onKeySet={setStopKey} />
                <KeyCaptureInput label="RESET Key" value={resetKey} onKeySet={setResetKey} />
              </FormSection>
            </div>
          )}

          {/* Sponsors Tab */}
          {activeTab === 'sponsors' && (
            <div className="space-y-6">
              <FormSection title="Add New Sponsor">
                <FormInput placeholder="Sponsor Name / Tag" value={newLogoTag} onChange={setNewLogoTag} />
                <FileInput label="Upload Logo" onChange={handleAddLogo} />
              </FormSection>

              <FormSection title="Current Sponsors">
                <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                  {logos.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No sponsors added yet.</p>
                  )}
                  {logos.map((logo, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                      <img src={logo.url} alt={logo.tag} className="w-8 h-8 object-contain bg-white/10 rounded-md" />
                      <span className="text-sm truncate mx-3 flex-1">{logo.tag}</span>
                      <button 
                        onClick={() => handleRemoveLogo(index)} 
                        className="p-1 rounded-full text-gray-500 hover:text-red-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                        title="Remove logo"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </FormSection>
            </div>
          )}
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