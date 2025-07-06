import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Custom components for markdown rendering
const MarkdownComponents = {
  h1: ({node, ...props}) => (
    <h1 className="text-xl font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2" {...props} />
  ),
  h2: ({node, ...props}) => (
    <h2 className="text-lg font-bold text-blue-900 mb-2" {...props} />
  ),
  h3: ({node, ...props}) => (
    <h3 className="text-base font-bold text-blue-900 mb-2" {...props} />
  ),
  h4: ({node, ...props}) => (
    <h4 className="text-sm font-bold text-blue-900 mb-1" {...props} />
  ),
  p: ({node, children, ...props}) => {
    // Handle special formatting for correction examples
    const text = children?.toString() || '';
    
    if (text.includes('❌ Original:') || text.includes('✅ Correction:')) {
      const isOriginal = text.includes('❌ Original:');
      return (
        <div className={`mb-3 p-3 rounded-lg border-l-4 ${isOriginal ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
          <p className={`leading-relaxed font-mono text-sm ${isOriginal ? 'text-red-800' : 'text-green-800'}`} {...props}>
            {children}
          </p>
        </div>
      );
    }
    
    return (
      <p className="mb-3 text-blue-800 leading-relaxed" {...props}>
        {children}
      </p>
    );
  },
  ul: ({node, ...props}) => (
    <ul className="list-disc list-inside mb-3 text-blue-800 space-y-1" {...props} />
  ),
  ol: ({node, ...props}) => (
    <ol className="list-decimal list-inside mb-3 text-blue-800 space-y-1" {...props} />
  ),
  li: ({node, ...props}) => (
    <li className="mb-1" {...props} />
  ),
  strong: ({node, ...props}) => (
    <strong className="font-semibold text-blue-900" {...props} />
  ),
  em: ({node, ...props}) => (
    <em className="italic text-blue-800" {...props} />
  ),
  code: ({node, inline, ...props}) => {
    if (inline) {
      return (
        <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm font-mono text-blue-900" {...props} />
      );
    }
    return (
      <code className="block bg-blue-100 px-2 py-1 rounded text-sm font-mono text-blue-900 overflow-x-auto" {...props} />
    );
  },
  pre: ({node, ...props}) => (
    <pre className="bg-blue-100 p-3 rounded-lg mb-3 overflow-x-auto border border-blue-200" {...props} />
  ),
  blockquote: ({node, ...props}) => (
    <blockquote className="border-l-4 border-blue-300 pl-4 italic text-blue-700 mb-3 bg-blue-50 py-2 rounded-r" {...props} />
  ),
  table: ({node, ...props}) => (
    <div className="overflow-x-auto mb-3">
      <table className="w-full border-collapse border border-blue-300" {...props} />
    </div>
  ),
  th: ({node, ...props}) => (
    <th className="border border-blue-300 px-3 py-2 bg-blue-100 font-semibold text-blue-900 text-left" {...props} />
  ),
  td: ({node, ...props}) => (
    <td className="border border-blue-300 px-3 py-2 text-blue-800" {...props} />
  ),
  hr: ({node, ...props}) => (
    <hr className="border-t border-blue-200 my-4" {...props} />
  ),
  a: ({node, ...props}) => (
    <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
  ),
  // Custom component for correction examples
  div: ({node, children, ...props}) => {
    const text = children?.toString() || '';
    if (text.includes('Example') && (text.includes('Original') || text.includes('Correction'))) {
      return (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg" {...props}>
          {children}
        </div>
      );
    }
    return <div {...props}>{children}</div>;
  },
  // Custom component for grouping correction examples
  h3: ({node, children, ...props}) => {
    const text = children?.toString() || '';
    if (text.includes('Example')) {
      return (
        <div className="mb-4">
          <h3 className="text-base font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2" {...props}>
            {children}
          </h3>
        </div>
      );
    }
    return (
      <h3 className="text-base font-bold text-blue-900 mb-2" {...props}>
        {children}
      </h3>
    );
  },
};

const MarkdownRenderer = ({ content, className = "" }) => {
  if (!content) {
    return null;
  }

  // Debug logging to see what content is being passed
  // console.log('MarkdownRenderer content:', content);
  // console.log('Content type:', typeof content);

  // Ensure content is a string
  const contentString = typeof content === 'string' ? content : String(content);

  // Process content to enhance correction examples
  const processedContent = enhanceCorrectionExamples(contentString);

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={MarkdownComponents}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

// Function to process and enhance correction examples
const processCorrectionExamples = (content) => {
  // Split content into lines
  const lines = content.split('\n');
  const processedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line contains both Original and Correction
    if (line.includes('Original:') && line.includes('Correction:')) {
      // Split the line into separate Original and Correction lines
      const parts = line.split('Correction:');
      if (parts.length === 2) {
        const originalPart = parts[0].replace('Original:', '').trim();
        const correctionPart = parts[1].trim();
        
        // Add them as separate lines with proper formatting
        processedLines.push(`**❌ Original:** "${originalPart}"`);
        processedLines.push(`**✅ Correction:** "${correctionPart}"`);
        processedLines.push(''); // Add empty line for spacing
      } else {
        processedLines.push(line);
      }
    } else if (line.includes('Original:') || line.includes('Correction:')) {
      // Handle single Original or Correction lines
      if (line.includes('Original:')) {
        processedLines.push(`**❌ ${line.trim()}**`);
      } else if (line.includes('Correction:')) {
        processedLines.push(`**✅ ${line.trim()}**`);
      } else {
        processedLines.push(line);
      }
    } else {
      processedLines.push(line);
    }
  }
  
  return processedLines.join('\n');
};

// Enhanced function to better handle correction examples
const enhanceCorrectionExamples = (content) => {
  // Replace the combined format with separate lines
  let enhancedContent = content;
  
  // Pattern to match: Original: "..." Correction: "..."
  const correctionPattern = /Original:\s*"([^"]+)"\s*Correction:\s*"([^"]+)"/g;
  
  enhancedContent = enhancedContent.replace(correctionPattern, (match, original, correction) => {
    return `**❌ Original:** "${original}"\n**✅ Correction:** "${correction}"`;
  });
  
  return enhancedContent;
};

export default MarkdownRenderer; 