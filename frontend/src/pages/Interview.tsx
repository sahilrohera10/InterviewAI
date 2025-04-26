import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, HelpCircle, Settings, Clock, Video, VideoOff, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

interface InterviewQuestion {
  id: string;
  question: string;
  type: string;
  followUp?: string[];
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: string;
}

interface SpeechRecognitionError extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionError) => void) | null;
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const Interview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);

  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [response, setResponse] = useState('');
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [currentVideo, setCurrentVideo] = useState<string>('');
  const [showFallback, setShowFallback] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const [webcamError, setWebcamError] = useState<string | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');

        setResponse(transcript);
      };

      recognition.onerror = (event: SpeechRecognitionError) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setIsPaused(false);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setIsPaused(false);
    }
  };

  const togglePause = () => {
    if (recognitionRef.current) {
      if (isPaused) {
        recognitionRef.current.start();
        setIsPaused(false);
      } else {
        recognitionRef.current.stop();
        setIsPaused(true);
      }
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setIsSpeaking(false);
  };

  // Speak text aloud
  const speakOutLoud = (text: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const indianVoice = voices.find(voice => voice.lang.includes('en-IN')) || voices.find(voice => voice.lang.includes('en'));

    if (indianVoice) {
      utterance.voice = indianVoice;
    }

    utterance.pitch = 1.2;
    utterance.rate = 1.1;
    utterance.volume = 1;

    setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    synth.cancel();
    synth.speak(utterance);
  };

  // Initialize webcam
  useEffect(() => {
    const startWebcam = async () => {
      if (!showCountdown) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true,
            audio: false 
          });
          
          if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing webcam:', error);
          setWebcamError('Could not access webcam. Please check your camera permissions.');
          setIsWebcamOn(false);
        }
      }
    };

    startWebcam();

    return () => {
      if (webcamRef.current?.srcObject) {
        const stream = webcamRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCountdown]);

  // Countdown timer effect
  useEffect(() => {
    if (showCountdown) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowCountdown(false);
            startInterview();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showCountdown]);

  // Start Interview and handle question flow
  const startInterview = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/api/interviews/${id}/start`);
      setCurrentQuestion(res.data.question);
      
      // Try to get AI video
      const videoUrl = await getAIVideo();
      if (videoUrl) {
        setCurrentVideo(videoUrl);
        setShowFallback(false);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else {
        setShowFallback(true);
        speakOutLoud(res.data.question.question);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to start interview.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!currentQuestion || !response.trim()) return;

    try {
      setIsLoading(true);
      const res = await axios.post(`/api/interviews/${id}/continue`, {
        questionId: currentQuestion.id,
        answer: response,
      });

      if (res.data.nextQuestion) {
        setCurrentQuestion(res.data.nextQuestion);
        
        // Try to get AI video for next question
        const videoUrl = await getAIVideo();
        if (videoUrl) {
          setCurrentVideo(videoUrl);
          setShowFallback(false);
          if (videoRef.current) {
            videoRef.current.play();
          }
        } else {
          setShowFallback(true);
          speakOutLoud(res.data.nextQuestion.question);
        }
        
        setResponse('');
      } else {
        navigate(`/analysis/${id}`);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to submit answer.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get AI video based on question
  const getAIVideo = async () => {
    try {
      // In a real implementation, this would call your backend which would:
      // 1. Generate speech from the question
      // 2. Use D-ID/HeyGen API to create a talking video
      // 3. Return the video URL
      // const response = await axios.post('/api/generate-ai-video', { text: question });
      return ''; // Return empty string for now since we're not using the video
    } catch (error) {
      console.error('Error generating AI video:', error);
      return '';
    }
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading && !currentQuestion) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-dark-100 relative">
      <AnimatePresence>
        {showCountdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-dark-100 z-50"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: countdown - 1 }}
                className="text-9xl font-bold text-primary-500"
              >
                {countdown}
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-xl text-gray-400"
              >
                Interview starting in...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-dark-200 border-b border-gray-800">
        <div className="flex items-center text-primary-400 space-x-2">
          <Clock size={16} />
          <span>{formatTime(timeLeft)}</span>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-full ${isMuted ? 'bg-red-500 text-white' : 'bg-dark-300 text-gray-400 hover:text-white'}`}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button 
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-2 rounded-full ${!isVideoOn ? 'bg-red-500 text-white' : 'bg-dark-300 text-gray-400 hover:text-white'}`}
          >
            {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>
          <button className="text-gray-400 hover:text-white p-2">
            <HelpCircle size={20} />
          </button>
          <button className="text-gray-400 hover:text-white p-2">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4 relative">
        {/* Interviewer Video */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-dark-200 rounded-xl border border-gray-800 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-200/80 z-10"></div>
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-white text-sm">Rahul Verma</span>
          </div>
          
          <div className="relative h-full flex items-center justify-center">
            {!showFallback && currentVideo ? (
              <video
                ref={videoRef}
                src={currentVideo}
                className="w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                onPlay={() => setIsSpeaking(true)}
                onEnded={handleVideoEnd}
                onError={() => {
                  setShowFallback(true);
                  speakOutLoud(currentQuestion?.question || '');
                }}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=interviewer" 
                  alt="AI Interviewer"
                  className={`w-48 h-48 rounded-full border-4 border-primary-500 object-cover ${isSpeaking ? 'animate-pulse' : ''}`}
                />
                {isSpeaking && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full border-4 border-primary-500/30 animate-ping"></div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="bg-dark-300/90 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-white text-lg">{currentQuestion?.question}</p>
              {currentQuestion?.followUp?.map((followup, idx) => (
                <p key={idx} className="text-gray-400 text-sm mt-2">{followup}</p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Response Box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-dark-200 p-6 rounded-xl border border-gray-800 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-bold">Your Response</h3>
            <div className="flex space-x-2">
              {isListening ? (
                <>
                  <button
                    onClick={togglePause}
                    className={`p-2 rounded-full ${isPaused ? 'bg-yellow-500 text-white' : 'bg-dark-300 text-gray-400 hover:text-white'}`}
                  >
                    {isPaused ? <Play size={20} /> : <Pause size={20} />}
                  </button>
                  <button
                    onClick={stopListening}
                    className="p-2 rounded-full bg-red-500 text-white"
                  >
                    <MicOff size={20} />
                  </button>
                </>
              ) : (
                <button
                  onClick={startListening}
                  className={`p-2 rounded-full ${isSpeaking ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-primary-500 text-white'}`}
                  disabled={isSpeaking}
                >
                  <Mic size={20} />
                </button>
              )}
            </div>
          </div>

          <div className="relative flex-grow">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder={isListening ? "Listening..." : isSpeaking ? "Interviewer is speaking..." : "Type or speak your response here..."}
              className="w-full h-full bg-dark-300 text-white p-4 rounded-lg border border-gray-700 focus:border-primary-500 focus:ring-primary-500 focus:ring-1 resize-none mb-4"
              disabled={isLoading || isListening || isSpeaking}
            />
            {isListening && (
              <div className="absolute top-2 right-2">
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-4 bg-primary-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-4 bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="px-3 py-1 text-sm text-gray-400 bg-dark-300 rounded-md hover:bg-dark-100"
              disabled={isLoading || isListening || isSpeaking}
            >
              Request clarification
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              disabled={isLoading || isListening || isSpeaking}
            >
              <Send size={16} className="inline mr-2" /> Submit
            </button>
          </div>
        </motion.div>
      </div>

      {/* Webcam Preview - Moved outside main content */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="relative">
          <div className="w-40 h-30 bg-dark-200 rounded-lg overflow-hidden border-2 border-primary-500">
            {isWebcamOn && !showCountdown ? (
              <video
                ref={webcamRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-dark-300">
                {/* Camera icon removed as per user's changes */}
              </div>
            )}
          </div>
        </div>
        {webcamError && (
          <div className="mt-2 text-xs text-red-500 bg-dark-200/90 p-2 rounded">
            {webcamError}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;
