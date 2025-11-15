
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderContent = () => {
    const lines = content.split('\n');

    return lines.map((line, index) => {
      // Heading
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(3)}</h2>;
      }
      // List item
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
      }
      // Bold text
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={index} className="my-1">
          {parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return <div className="prose prose-sm max-w-none">{renderContent()}</div>;
};

export default MarkdownRenderer;
