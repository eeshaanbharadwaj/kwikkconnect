import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setShowWelcome(true);
    setTimeout(() => {
      navigate("/dashboard-case-management-overview");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-400/25 to-blue-400/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="glass-card p-8 animate-fade-in-up">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow animate-float">
              <span className="text-2xl font-bold text-white">K</span>
            </div>
            <h1 className="text-3xl font-bold text-gradient-primary mb-2">KwikkConnect</h1>
            <p className="text-neutral-600">Case Management Platform</p>
          </div>
          
          {showWelcome ? (
            <div className="flex flex-col items-center justify-center min-h-[200px] animate-scale-in">
              <div className="w-20 h-20 bg-gradient-success rounded-2xl flex items-center justify-center mb-6 shadow-glow-success animate-bounce-gentle">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Welcome!</h2>
              <p className="text-neutral-600 text-center">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-neutral-200 rounded-xl shadow-inner-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-neutral-400"
                    placeholder="Enter your email address"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-neutral-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-neutral-200 rounded-xl shadow-inner-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-neutral-400"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-neutral-600">Remember me</span>
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
              
              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-primary text-white font-semibold rounded-xl shadow-glow hover:shadow-glow transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              {/* Demo Notice */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-700 text-center">
                  <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  This is a demo version. Any email and password will work.
                </p>
              </div>
            </form>
          )}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-neutral-500">
            © 2024 KwikkConnect. Built with modern web technologies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 