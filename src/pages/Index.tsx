
import React, { useState, useEffect } from 'react';
import { Copy, FileText, Sparkles, Moon, Sun, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import NewsletterPreview from '@/components/NewsletterPreview';
import ApiKeyDialog from '@/components/ApiKeyDialog';
import { generateNewsletter, generateNewsletterWithAI } from '@/services/newsletterService';

const Index = () => {
  const [rawInput, setRawInput] = useState('');
  const [generatedNewsletter, setGeneratedNewsletter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [savedDrafts, setSavedDrafts] = useState<string[]>([]);

  useEffect(() => {
    // Load API key and saved drafts from localStorage on component mount
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

    const drafts = localStorage.getItem('newsletter-drafts');
    if (drafts) {
      setSavedDrafts(JSON.parse(drafts));
    }
  }, []);

  const handleGenerate = async () => {
    if (!rawInput.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some raw content to generate a newsletter.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      let newsletter;
      if (apiKey) {
        newsletter = await generateNewsletterWithAI(rawInput, apiKey);
      } else {
        newsletter = await generateNewsletter(rawInput);
      }
      setGeneratedNewsletter(newsletter);
      
      // Save to localStorage
      const newDrafts = [newsletter, ...savedDrafts.slice(0, 4)]; // Keep last 5 drafts
      setSavedDrafts(newDrafts);
      localStorage.setItem('newsletter-drafts', JSON.stringify(newDrafts));
      
      toast({
        title: "Newsletter Generated!",
        description: apiKey ? "AI-powered newsletter generated successfully." : "Mock newsletter generated (configure AI API key for real AI processing).",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate newsletter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedNewsletter);
      toast({
        title: "Copied!",
        description: "Newsletter content copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadHTML = () => {
    if (!generatedNewsletter) {
      toast({
        title: "No Content",
        description: "Please generate a newsletter first.",
        variant: "destructive"
      });
      return;
    }

    const blob = new Blob([generatedNewsletter], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neurealm-newsletter-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Newsletter downloaded as HTML file.",
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Newsletter Generator
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Transform raw updates into professional newsletters
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ApiKeyDialog onApiKeySet={setApiKey} currentApiKey={apiKey} />
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Raw Content Input</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="raw-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paste your departmental updates, announcements, and achievements:
                </label>
                <Textarea
                  id="raw-input"
                  placeholder="Example:&#10;- Sales team exceeded Q3 targets by 15%&#10;- New employee onboarding program launched&#10;- Holiday party scheduled for Dec 15th&#10;- IT department completed security audit&#10;- Marketing campaign generated 200 new leads"
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !rawInput.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Newsletter
                    </>
                  )}
                </Button>
              </div>
              {!apiKey && (
                <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                  💡 Configure your Google AI API key in settings for real AI processing
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  <span>Generated Newsletter</span>
                </div>
                {generatedNewsletter && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadHTML}
                      title="Download as HTML"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      HTML
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedNewsletter ? (
                <NewsletterPreview content={generatedNewsletter} />
              ) : (
                <div className="min-h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Your newsletter will appear here</p>
                    <p className="text-sm">Enter raw content and click generate to get started</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sample Input Examples */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Sample Input Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Team Achievements:</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  "Sales team hit 120% of quarterly target, Engineering deployed 15 new features, 
                  Marketing campaign increased engagement by 35%"
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Upcoming Events:</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  "Company retreat March 15-17, Q1 All-hands meeting Feb 28, 
                  New employee orientation every Monday"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saved Drafts Section */}
        {savedDrafts.length > 0 && (
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Recent Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {savedDrafts.slice(0, 3).map((draft, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Draft {index + 1} - {new Date().toLocaleDateString()}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGeneratedNewsletter(draft)}
                    >
                      Load
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
