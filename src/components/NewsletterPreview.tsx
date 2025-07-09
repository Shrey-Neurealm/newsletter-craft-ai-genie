
import React from 'react';

interface NewsletterPreviewProps {
  content: string;
}

const NewsletterPreview = ({ content }: NewsletterPreviewProps) => {
  // Check if content is HTML or plain text
  const isHtml = content.trim().startsWith('<!DOCTYPE html>') || content.trim().startsWith('<html');
  
  if (isHtml) {
    // For HTML content, display in an iframe for proper rendering
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden min-h-[300px] max-h-[600px]">
        <iframe
          srcDoc={content}
          className="w-full h-[580px] border-0"
          title="Newsletter Preview"
          sandbox="allow-same-origin"
        />
      </div>
    );
  }

  // Fallback for markdown content (existing functionality)
  const formatContent = (text: string) => {
    return text
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-6 mb-3 text-blue-600 dark:text-blue-400">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-8 mb-6 text-gray-900 dark:text-white">$1</h1>')
      .replace(/^\* (.*$)/gm, '<li class="ml-4 mb-2 text-gray-700 dark:text-gray-300">$1</li>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-2 text-gray-700 dark:text-gray-300">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 dark:text-gray-300">')
      .replace(/\n/g, '<br>');
  };

  const formattedContent = formatContent(content);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 min-h-[300px] max-h-[600px] overflow-y-auto">
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <div 
          className="newsletter-content"
          dangerouslySetInnerHTML={{ 
            __html: `<p class="mb-4 text-gray-700 dark:text-gray-300">${formattedContent}</p>` 
          }} 
        />
      </div>
    </div>
  );
};

export default NewsletterPreview;
