import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, useLocation, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import DashboardCaseManagementOverview from "pages/dashboard-case-management-overview";
import CreateNewCaseForm from "pages/create-new-case-form";
import ExpertMatchingPanel from "pages/expert-matching-panel";
import CaseTimelineActivityTracking from "pages/case-timeline-activity-tracking";
import SwarmRoomRealTimeCollaboration from "pages/swarm-room-real-time-collaboration";
import PostmortemAnalysisDocumentation from "pages/postmortem-analysis-documentation";
import NotFound from "pages/NotFound";
import Login from "pages/Login";
import Home from "pages/Home";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  in: { 
    opacity: 1, 
    y: 0,
    scale: 1
  },
  out: { 
    opacity: 0, 
    y: -20,
    scale: 0.95
  }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.4
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location} key={location.pathname}>
        <Route path="/login" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Login />
          </motion.div>
        } />
        <Route path="/home" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Home />
          </motion.div>
        } />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard-case-management-overview" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <DashboardCaseManagementOverview />
          </motion.div>
        } />
        <Route path="/create-new-case-form" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <CreateNewCaseForm />
          </motion.div>
        } />
        <Route path="/expert-matching-panel" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <ExpertMatchingPanel />
          </motion.div>
        } />
        <Route path="/case-timeline-activity-tracking" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <CaseTimelineActivityTracking />
          </motion.div>
        } />
        <Route path="/swarm-room-real-time-collaboration" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <SwarmRoomRealTimeCollaboration />
          </motion.div>
        } />
        <Route path="/postmortem-analysis-documentation" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <PostmortemAnalysisDocumentation />
          </motion.div>
        } />
        <Route path="*" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <NotFound />
          </motion.div>
        } />
      </RouterRoutes>
    </AnimatePresence>
  );
}

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <AnimatedRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;