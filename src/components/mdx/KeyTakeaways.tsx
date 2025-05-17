import React from 'react';

interface KeyTakeawaysProps {
  points: string[];
}

export function KeyTakeaways({ points }: KeyTakeawaysProps) {
  return (
    <div className="my-8 p-6 bg-muted rounded-lg border border-border">
      <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeyTakeaways; 