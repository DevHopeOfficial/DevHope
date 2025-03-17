
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import FinancialLiteracy from './pages/FinancialLiteracy';
import Jobs from './pages/Jobs';
import Community from './pages/Community';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import ErrorBoundary from './components/ErrorBoundary';
import SkillsAssessment from './pages/SkillsAssessment';
import PageTransition from './components/PageTransition';
import LoadingIndicator from './components/LoadingIndicator';

// Router component with loading state
const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Set loading to true when location changes
    setIsLoading(true);
    
    // Set it back to false after a short delay to simulate loading
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timeout);
  }, [location]);
  
  return (
    <>
      <LoadingIndicator isLoading={isLoading} />
      <PageTransition>
        <Routes>
          <Route path="/" element={
            <ErrorBoundary>
              <Index />
            </ErrorBoundary>
          } />
          <Route path="/financial-literacy" element={
            <ErrorBoundary>
              <FinancialLiteracy />
            </ErrorBoundary>
          } />
          <Route path="/jobs" element={
            <ErrorBoundary>
              <Jobs />
            </ErrorBoundary>
          } />
          <Route path="/saved-jobs" element={<Navigate to="/jobs?saved=true" replace />} />
          <Route path="/skills-assessment" element={
            <ErrorBoundary>
              <SkillsAssessment />
            </ErrorBoundary>
          } />
          <Route path="/community" element={
            <ErrorBoundary>
              <Community />
            </ErrorBoundary>
          } />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </PageTransition>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
      <BackToTopButton />
      <Toaster />
    </Router>
  );
}

export default App;
