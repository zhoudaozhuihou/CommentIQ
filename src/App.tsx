import React, { useState } from 'react';
import { Loader, AlertCircle, CheckCircle } from 'lucide-react';
import ReviewAnalysis from './components/ReviewAnalysis';
import { scrapeReviews, analyzeReviews } from './utils/reviewUtils';

function App() {
  const [isScrapingReviews, setIsScrapingReviews] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviews, setReviews] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<{ painPoints: string[], sellingPoints: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScrapeReviews = async () => {
    setIsScrapingReviews(true);
    setError(null);
    try {
      const scrapedReviews = await scrapeReviews();
      setReviews(scrapedReviews);
    } catch (err) {
      setError('Failed to scrape reviews. Please make sure you are on an Amazon product page.');
    }
    setIsScrapingReviews(false);
  };

  const handleAnalyzeReviews = async () => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeReviews(reviews);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze reviews. Please try again later.');
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="w-96 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Amazon Review Analyzer</h1>
      
      <button
        onClick={handleScrapeReviews}
        disabled={isScrapingReviews}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isScrapingReviews ? (
          <><Loader className="inline-block mr-2 animate-spin" size={16} /> Scraping Reviews...</>
        ) : (
          'Scrape Reviews'
        )}
      </button>

      {reviews.length > 0 && (
        <button
          onClick={handleAnalyzeReviews}
          disabled={isAnalyzing}
          className="w-full bg-green-500 text-white py-2 px-4 rounded mb-4 hover:bg-green-600 disabled:bg-green-300"
        >
          {isAnalyzing ? (
            <><Loader className="inline-block mr-2 animate-spin" size={16} /> Analyzing...</>
          ) : (
            'Analyze Reviews'
          )}
        </button>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <AlertCircle className="inline-block mr-2" size={16} />
          {error}
        </div>
      )}

      {reviews.length > 0 && (
        <div className="mb-4">
          <CheckCircle className="inline-block mr-2 text-green-500" size={16} />
          <span>{reviews.length} reviews scraped</span>
        </div>
      )}

      {analysis && <ReviewAnalysis analysis={analysis} />}
    </div>
  );
}

export default App;