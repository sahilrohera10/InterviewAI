import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BrainCog, Menu, X } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

// Add interface for type safety
interface UserData {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check for stored user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('userData');
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoogleLoginSuccess = useCallback(async (credentialResponse: CredentialResponse) => {
    if (isLoggingIn) return; // Prevent multiple simultaneous login attempts
    
    try {
      setIsLoggingIn(true);

      if (!credentialResponse.credential) {
        throw new Error('No credentials received');
      }

      // Decode the JWT token to get user info
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const userData = JSON.parse(jsonPayload);
      
      // Store user data in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('googleToken', credentialResponse.credential);
      
      setUser(userData);
      console.log('Login successful:', userData);

    } catch (error) {
      console.error('Error during Google login:', error);
      localStorage.removeItem('userData');
      localStorage.removeItem('googleToken');
    } finally {
      setIsLoggingIn(false);
    }
  }, [isLoggingIn]);

  const handleGoogleLoginError = useCallback(() => {
    console.error('Google login failed');
    setIsLoggingIn(false);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('userData');
    localStorage.removeItem('googleToken');
    setUser(null);
  }, []);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Demo', href: '#demo' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  // Get the client ID based on environment
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  // Add this console log to verify the client ID
  useEffect(() => {
    console.log('Current origin:', window.location.origin);
    console.log('Client ID:', googleClientId);
  }, []);

  const renderGoogleLogin = useCallback(() => (
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={handleGoogleLoginError}
      useOneTap={false} // Disable one tap to prevent FedCM errors
      type="standard"
      theme="filled_black"
      size="large"
      text="signin_with"
      shape="rectangular"
      width={240}
      locale="en"
    />
  ), [handleGoogleLoginSuccess, handleGoogleLoginError]);

  return (
    <GoogleOAuthProvider 
      clientId={googleClientId}
      onScriptLoadError={(error) => {
        console.error('Google Sign In script failed to load:', error);
      }}
    >
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark-300 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <a href="#" className="flex items-center">
              <BrainCog className="h-8 w-8 text-primary-500 mr-2" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-500">
                Intervue.AI
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              {user ? (
                <div className="flex items-center space-x-4">
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      console.error('Image failed to load:', e);
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
                    }}
                  />
                  <span className="text-gray-300">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
                    disabled={isLoggingIn}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                renderGoogleLogin()
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div 
          className={`md:hidden bg-dark-300 shadow-lg ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col py-4 px-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-2 text-gray-300 hover:text-primary-400 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {user ? (
              <div className="flex items-center space-x-4 py-2">
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    console.error('Image failed to load:', e);
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
                  }}
                />
                <span className="text-gray-300">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
                  disabled={isLoggingIn}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4">
                {renderGoogleLogin()}
              </div>
            )}
          </nav>
        </motion.div>
      </header>
    </GoogleOAuthProvider>
  );
};

export default Header;