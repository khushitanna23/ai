import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneOff,
  Mic,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Bot,
  User,
  Wrench,
  Stethoscope,
  Scale,
  Building2,
  CheckCircle2,
  Clock,
  Zap,
  Activity,
  ArrowRight,
  Database,
  Check,
} from 'lucide-react';
import { getLocalAiResponse } from '../data/demoScenarios';

const scenariosData = {
  home: {
    id: 'home',
    name: 'Home Services',
    company: 'Precision HVAC & Plumbing',
    badge: 'Precision HVAC & Plumbing',
    location: 'Austin, Texas • Est. 2011 • 24/7 Dispatch',
    icon: Wrench,
    initialGreeting:
      'Thank you for calling Precision Climate Solutions 24/7 dispatch. How can I help you today?',
    suggestedExamples: [
      'Our AC stopped cooling, can someone come out?',
      'Do you provide 24/7 emergency dispatch?',
      'What are your business hours?',
      'Can you transfer my call?',
    ],
    intentDefault: 'HVAC / Plumbing Dispatch',
  },
  dental: {
    id: 'dental',
    name: 'Dental Clinic',
    company: 'Apex Dental Care',
    badge: 'Apex Dental Care',
    location: 'Denver, Colorado • Est. 2016 • New Patients Welcome',
    icon: Stethoscope,
    initialGreeting:
      'Hi! Thanks for calling Apex Dental Care. How can I assist you with your appointment or dental inquiry today?',
    suggestedExamples: [
      'Can I book a dental cleaning appointment?',
      'Do you accept Delta Dental insurance?',
      'I have severe tooth pain, do you have emergency slots?',
      'What are your office hours this week?',
    ],
    intentDefault: 'Dental Practice Inquiry',
  },
  general: {
    id: 'general',
    name: 'Vedanco AI',
    company: '24/7 AI Receptionist (General)',
    badge: 'Vedanco AI Head Office',
    location: 'San Francisco, CA • US Enterprise SaaS',
    icon: Bot,
    initialGreeting: 'Hi! Thanks for calling Vedanco AI. How can I help you today?',
    suggestedExamples: [
      'What services do you provide?',
      'How much does it cost?',
      'Can you book an appointment?',
      'Can you transfer calls to my staff?',
    ],
    intentDefault: 'General SaaS / AI Receptionist',
  },
  legal: {
    id: 'legal',
    name: 'Law Firm',
    company: 'Sterling & Sons Legal',
    badge: 'Sterling & Sons Legal',
    location: 'Chicago, Illinois • Confidential Client Intake',
    icon: Scale,
    initialGreeting:
      'Thank you for calling Sterling & Sons Legal. Are you inquiring about a new case consultation or an existing matter?',
    suggestedExamples: [
      'I need to schedule a consultation with an attorney.',
      'Do you handle personal injury or business law?',
      'What are your consultation fees?',
      'Can I speak with someone regarding an urgent court deadline?',
    ],
    intentDefault: 'Legal Consultation Intake',
  },
  realestate: {
    id: 'realestate',
    name: 'Real Estate',
    company: 'Summit Realty Group',
    badge: 'Summit Realty Group',
    location: 'Miami, Florida • Luxury & Residential Brokerage',
    icon: Building2,
    initialGreeting:
      'Hello! Thanks for calling Summit Realty Group. Are you inquiring about buying, selling, or a specific property listing?',
    suggestedExamples: [
      'I want to schedule a tour for 742 Evergreen Terrace.',
      'Can you tell me the listing price and square footage?',
      'Are you taking new listings in this neighborhood?',
      'Can I speak with a licensed listing agent?',
    ],
    intentDefault: 'Real Estate Inquiry',
  },
};

export default function LiveDemoSection({ onOpenDemo, onOpenCall }) {
  const [activeTab, setActiveTab] = useState('interactive'); // 'interactive' | 'telephony'
  const [selectedScenarioKey, setSelectedScenarioKey] = useState('home'); // Default to Home Services like Image 1
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [callDuration, setCallDuration] = useState(25); // Initial timer
  const [currentIntent, setCurrentIntent] = useState('Inbound caller greeting');
  const [qualificationStatus, setQualificationStatus] = useState('Awaiting caller question');

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isInitialLoad = useRef(true);

  const scenario = scenariosData[selectedScenarioKey] || scenariosData.home;
  const ScenarioIcon = scenario.icon;

  // Initialize greeting on scenario change
  useEffect(() => {
    setMessages([
      {
        id: 'init_' + Date.now(),
        sender: 'ai',
        name: 'Vedanco AI Receptionist',
        text: scenario.initialGreeting,
        timestamp: '04:55 PM',
      },
    ]);
    setCallDuration(18);
    setCurrentIntent(scenario.intentDefault);
    setQualificationStatus('Awaiting caller question');
  }, [selectedScenarioKey]);

  // Call duration counter
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll transcript only inside its internal container, NEVER scrolling the main window
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isThinking]);

  const speakVoice = (text) => {
    if (!soundEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (customText) => {
    const query = (customText || inputQuery).trim();
    if (!query || isThinking) return;

    const userMsg = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      name: 'You (Caller)',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);
    setIsSpeaking(false);

    // Update dynamic intelligence tags based on keywords
    const lower = query.toLowerCase();
    if (lower.includes('ac') || lower.includes('leak') || lower.includes('emergency') || lower.includes('tooth')) {
      setCurrentIntent('Emergency Service Dispatch (Priority 1)');
      setQualificationStatus('Urgent Assistance Required');
    } else if (lower.includes('appointment') || lower.includes('book') || lower.includes('schedule') || lower.includes('tour')) {
      setCurrentIntent('Calendar Appointment Booking');
      setQualificationStatus('High Intent • Scheduling');
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
      setCurrentIntent('Pricing & Estimate Inquiry');
      setQualificationStatus('Pre-Qualified Lead');
    } else {
      setCurrentIntent('Inbound Information Request');
      setQualificationStatus('Qualified & Verified');
    }

    try {
      let aiText = '';
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          scenario: selectedScenarioKey,
          conversationHistory: messages.slice(-6),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        aiText = data.response;
      } else {
        aiText = getLocalAiResponse(query, selectedScenarioKey);
      }

      setTimeout(() => {
        const aiMsg = {
          id: 'ai_' + Date.now(),
          sender: 'ai',
          name: 'Vedanco AI Receptionist',
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsThinking(false);
        setIsSpeaking(true);
        speakVoice(aiText);

        setTimeout(() => setIsSpeaking(false), 2500);
      }, 700);
    } catch (err) {
      setTimeout(() => {
        const aiText = getLocalAiResponse(query, selectedScenarioKey);
        const aiMsg = {
          id: 'ai_' + Date.now(),
          sender: 'ai',
          name: 'Vedanco AI Receptionist',
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsThinking(false);
        setIsSpeaking(true);
        speakVoice(aiText);
      }, 700);
    }
  };

  const handleResetConversation = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setMessages([
      {
        id: 'init_' + Date.now(),
        sender: 'ai',
        name: 'Vedanco AI Receptionist',
        text: scenario.initialGreeting,
        timestamp: '04:55 PM',
      },
    ]);
    setCallDuration(0);
    setIsThinking(false);
    setIsSpeaking(false);
    setCurrentIntent(scenario.intentDefault);
    setQualificationStatus('Awaiting caller question');
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <section id="live-demo" className="py-14 sm:py-24 bg-[#070C1E] text-white relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header matching Image 1 */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            <span>INTERACTIVE VOICE RECEPTIONIST DEMO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Don't Just Read About It.{' '}
            <span className="text-blue-500 block sm:inline">Talk to It.</span>
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-300">
            Experience how Vedanco AI can handle a real customer conversation.
          </p>

          <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Available 24/7
            </span>
            <span className="hidden sm:inline">•</span>
            <span>No signup required. Experience the demo yourself.</span>
          </div>
        </div>

        {/* Top Toggle Pills matching Image 1 */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'interactive'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-[#0B1120] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive AI Receptionist</span>
          </button>

          <button
            onClick={() => setActiveTab('telephony')}
            className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'telephony'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-[#0B1120] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>Telephony API Integration (Vapi / Retell)</span>
          </button>
        </div>

        {/* Scenarios Row matching Image 1 */}
        <div className="mb-8 sm:mb-10">
          <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            CHOOSE A BUSINESS CONTEXT TO TEST (OR ASK ANY CUSTOM QUESTION):
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 max-w-5xl mx-auto">
            {Object.values(scenariosData).map((sc) => {
              const isSelected = selectedScenarioKey === sc.id;
              const Icon = sc.icon;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioKey(sc.id)}
                  className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-950/40 border-2 border-blue-500 shadow-md shadow-blue-500/20'
                      : 'bg-[#0B1120] border-slate-800/90 hover:border-slate-700 hover:bg-[#0e162a]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white truncate mr-1">{sc.name}</span>
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                  </div>
                  <span className="text-[10px] text-slate-400 truncate block">
                    {sc.company}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Two-Column Interactive Layout matching Image 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch mb-6 sm:mb-8 max-w-6xl mx-auto">
          {/* LEFT COLUMN: Phone Call Visualizer Card (VEDANCO VOICE) */}
          <div className="lg:col-span-4 rounded-2xl sm:rounded-3xl bg-[#0B1120] border border-slate-800 p-4 sm:p-6 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Header inside Left Card */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-wider uppercase text-white font-mono">
                    VEDANCO VOICE
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] sm:text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Demo Active</span>
                </div>
              </div>

              {/* Central Graphic with Scenario Icon & Details */}
              <div className="text-center py-2 sm:py-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-blue-600/10 border-2 border-blue-500/40 flex items-center justify-center text-blue-400 mb-3 sm:mb-4 shadow-inner shadow-blue-500/20">
                  <ScenarioIcon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-blue-500 border-2 border-[#0B1120] animate-ping" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white">{scenario.name}</h3>
                <p className="text-xs font-medium text-blue-400 mt-0.5">{scenario.company}</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                  {scenario.location}
                </p>
              </div>

              {/* Waveform Section */}
              <div className="mt-4 sm:mt-6 bg-[#070C1E] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-800/80">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 mb-2">
                  <span className="font-bold tracking-wider uppercase font-mono">VOICE ENGINE</span>
                  <span className="text-emerald-400 font-mono">00:{String(callDuration).padStart(2, '0')}</span>
                </div>

                {/* Animated Equalizer Waveform */}
                <div className="flex items-center justify-between gap-0.5 sm:gap-1 h-9 sm:h-10 px-1 sm:px-2 overflow-hidden">
                  {[8, 14, 24, 10, 28, 18, 12, 22, 16, 26, 20, 14, 30, 18, 24, 12, 20, 16, 22, 10, 14, 8].map(
                    (h, i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 shrink-0 ${
                          isSpeaking ? 'bg-blue-400 animate-waveform' : 'bg-blue-500/70 h-3'
                        }`}
                        style={{
                          height: isSpeaking ? `${h}px` : undefined,
                          animationDelay: `${(i % 6) * 0.12}s`,
                        }}
                      />
                    )
                  )}
                </div>

                <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 pt-2 border-t border-slate-800/60 mt-2 font-mono">
                  <span>Voice: {isSpeaking ? 'Speaking...' : isThinking ? 'Thinking...' : 'Ready'}</span>
                  <span className="text-blue-400">Latency: 380ms</span>
                </div>
              </div>
            </div>

            {/* Audio Toggle & Reset Button */}
            <div className="mt-4 sm:mt-6 space-y-2">
              <button
                onClick={onOpenCall}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>Call Our AI (Receive Real Call)</span>
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  soundEnabled
                    ? 'bg-blue-600/30 border-blue-500/50 text-blue-300'
                    : 'bg-[#070C1E] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{soundEnabled ? 'AI Voice Audio ON' : 'Turn AI Voice Audio ON'}</span>
              </button>

              <button
                onClick={handleResetConversation}
                className="w-full py-2.5 px-3 rounded-xl bg-[#070C1E] hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset / Start Over Conversation</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Speech Transcript & User Input matching Image 1 */}
          <div className="lg:col-span-8 rounded-2xl sm:rounded-3xl bg-[#0B1120] border border-slate-800 flex flex-col justify-between shadow-2xl overflow-hidden">
            {/* Transcript Header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-800 flex items-center justify-between bg-[#0B1120]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-white font-mono">
                  LIVE SPEECH TRANSCRIPT
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                {messages.length} {messages.length === 1 ? 'message' : 'messages'}
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div
              ref={chatContainerRef}
              className="p-3.5 sm:p-6 min-h-[250px] sm:min-h-[300px] max-h-[360px] overflow-y-auto space-y-3.5 sm:space-y-4 bg-[#070C1E]/60"
            >
              {messages.map((msg) => {
                const isAi = msg.sender === 'ai';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 sm:gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAi && (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0 text-blue-400 mt-1">
                        <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    )}

                    <div className={`max-w-[92%] sm:max-w-[85%] flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 px-1">
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                          {msg.name}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                      </div>

                      <div
                        className={`p-3 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isAi
                            ? 'bg-[#131C31] text-slate-100 border border-slate-800 rounded-tl-sm shadow-sm'
                            : 'bg-blue-600 text-white font-medium rounded-tr-sm shadow-md'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>

                    {!isAi && (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300 mt-1">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isThinking && (
                <div className="flex items-start gap-2.5 sm:gap-3 justify-start animate-fadeIn">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0 text-blue-400 mt-1">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="bg-[#131C31] border border-slate-800 rounded-2xl rounded-tl-sm px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 text-xs text-slate-300">
                    <span className="text-slate-400 font-medium text-xs">Vedanco AI is thinking</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0s]" />
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Examples Row matching Image 1 */}
            <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 bg-[#0B1120] border-t border-slate-800/80">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                SUGGESTED EXAMPLES IN THIS SCENARIO:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs">
                {scenario.suggestedExamples.map((promptText, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(promptText)}
                    disabled={isThinking}
                    className="truncate text-left px-3 py-2 rounded-xl bg-[#070C1E] hover:bg-blue-600/10 hover:border-blue-500/40 border border-slate-800 text-slate-300 hover:text-white text-[11px] sm:text-xs transition-colors disabled:opacity-50"
                  >
                    "{promptText}"
                  </button>
                ))}
              </div>
            </div>

            {/* User Input Area matching Image 1 */}
            <div className="p-3 sm:p-5 bg-[#0B1120] border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 sm:gap-2.5"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask Vedanco AI anything..."
                    disabled={isThinking}
                    className="w-full pl-3.5 sm:pl-4 pr-9 sm:pr-10 py-2.5 sm:py-3 rounded-xl bg-[#070C1E] border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:opacity-60"
                  />
                  <button
                    type="button"
                    title="Microphone input"
                    onClick={() => handleSendMessage(scenario.suggestedExamples[0])}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-400 p-1"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isThinking}
                  className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Structured Call Intelligence Card matching Image 1 */}
        <div className="max-w-6xl mx-auto rounded-2xl sm:rounded-3xl bg-[#0B1120] border border-slate-800 p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3.5 sm:pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                REAL-TIME STRUCTURED CALL INTELLIGENCE
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
              Live CRM Sync: Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs font-mono mb-4">
            <div className="bg-[#070C1E] p-3 sm:p-3.5 rounded-xl border border-slate-800/80 space-y-1">
              <div className="text-slate-400 text-[10px] uppercase font-bold">CALLER INTENT & DATA</div>
              <div className="text-white font-semibold">{currentIntent}</div>
              <div className="text-slate-400 text-[11px]">Caller: Inbound Caller • +1 (555) 234-1921</div>
            </div>

            <div className="bg-[#070C1E] p-3 sm:p-3.5 rounded-xl border border-slate-800/80 space-y-1">
              <div className="text-slate-400 text-[10px] uppercase font-bold">QUALIFIED STATUS</div>
              <div className="text-emerald-400 font-semibold">{qualificationStatus}</div>
              <div className="text-slate-400 text-[11px]">Workflow: Auto-Book + SMS Confirmation Ready</div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-xs text-center sm:text-left">
            <span className="text-slate-400">
              Need custom call flows for your specific business?
            </span>
            <button
              onClick={onOpenDemo}
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <span>Book Free Custom Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
