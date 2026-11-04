import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/sections/Footer";

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card max-w-lg p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl relative">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-6 shadow-glow">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground mt-1 mb-3">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            The automation workflow or route you requested does not exist or has been relocated to another endpoint.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 shadow-glow hover:scale-105 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            <span>Return to Safe Ground</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
