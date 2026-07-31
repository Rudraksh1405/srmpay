import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="glass-panel max-w-md w-full">
        <MapPin size={64} className="mx-auto text-slate-400 mb-6" />
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-200">Lost on campus?</h2>
        <p className="text-slate-500 mb-8">We couldn't find the page you were looking for.</p>
        <Link to="/">
          <Button variant="primary" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
