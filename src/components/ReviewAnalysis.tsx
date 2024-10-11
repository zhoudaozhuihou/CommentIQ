import React from 'react';

interface ReviewAnalysisProps {
  analysis: {
    painPoints: string[];
    sellingPoints: string[];
  };
}

const ReviewAnalysis: React.FC<ReviewAnalysisProps> = ({ analysis }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Analysis Results</h2>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Pain Points</h3>
        <ul className="list-disc pl-5">
          {analysis.painPoints.map((point, index) => (
            <li key={index} className="text-red-600">{point}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Selling Points</h3>
        <ul className="list-disc pl-5">
          {analysis.sellingPoints.map((point, index) => (
            <li key={index} className="text-green-600">{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewAnalysis;