
import React, { useState, useCallback } from 'react';
import { InputSection } from './components/InputSection';
import { ScriptDisplay } from './components/ScriptDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { generateScriptFromTopic } from './services/geminiService';
import { SparklesIcon } from './components/icons/SparklesIcon'; // Assuming this is a suitable icon

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [script, setScript] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleGenerateScript = useCallback(async () => {
    if (!topic.trim()) {
      setError('অনুগ্রহ করে একটি বিষয় লিখুন। (Please enter a topic.)');
      return;
    }
    setIsLoading(true);
    setError(null);
    setScript('');
    setCopySuccess(null);

    try {
      const generatedScript = await generateScriptFromTopic(topic);
      setScript(generatedScript);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('স্ক্রিপ্ট তৈরি করার সময় একটি অজানা ত্রুটি ঘটেছে। (An unknown error occurred.)');
      }
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  const handleCopyToClipboard = useCallback(() => {
    if (!script) return;
    navigator.clipboard.writeText(script)
      .then(() => {
        setCopySuccess('স্ক্রিপ্ট কপি করা হয়েছে! (Script copied!)');
        setTimeout(() => setCopySuccess(null), 2000);
      })
      .catch(err => {
        console.error('Copy failed:', err);
        setError('ক্লিপবোর্ডে কপি করতে ব্যর্থ হয়েছে। (Failed to copy to clipboard.)');
      });
  }, [script]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-slate-50 to-secondary-light py-8 px-4 flex flex-col items-center">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <SparklesIcon className="h-12 w-12 text-primary-dark mr-3" />
          <h1 className="text-4xl font-bold text-primary-dark">
            বাংলা শর্টস স্ক্রিপ্ট জেনারেটর
          </h1>
        </div>
        <p className="text-lg text-gray-700">
          আপনার পছন্দের বিষয়ে আকর্ষণীয় শর্টস ভিডিও স্ক্রিপ্ট তৈরি করুন!
        </p>
      </header>

      <main className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
        <InputSection
          topic={topic}
          onTopicChange={setTopic}
          onSubmit={handleGenerateScript}
          isLoading={isLoading}
        />

        {isLoading && <LoadingSpinner />}
        {error && <ErrorDisplay message={error} onClose={() => setError(null)} />}
        {copySuccess && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
            {copySuccess}
          </div>
        )}

        {script && !isLoading && (
          <ScriptDisplay script={script} onCopy={handleCopyToClipboard} />
        )}
      </main>

      <footer className="mt-12 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} বাংলা শর্টস স্ক্রিপ্ট জেনারেটর। সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="text-sm">Gemini API দ্বারা চালিত।</p>
      </footer>
    </div>
  );
};

export default App;
