import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import {
  PaperclipIcon,
  SendIcon,
  BotIcon,
  UserIcon,
  CloseIcon,
  ChatbotIcon,
  RefreshIcon,
  ExternalLinkIcon,
} from './Icons';
import MarkdownRenderer from './MarkdownRenderer';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<{ file: File; url: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);
  
  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage({ file, url });
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
  });

  const sendMessage = async (prompt: string, attachedImage?: { file: File; url: string } | null) => {
    if (!prompt.trim() && !attachedImage) return;

    setError(null);
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: prompt,
      image: attachedImage?.url,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setImage(null);

    try {
      let imagePayload;
      if (attachedImage) {
        const base64 = await toBase64(attachedImage.file);
        imagePayload = { base64, mimeType: attachedImage.file.type };
      }

      const { text, citations } = await getChatbotResponse(prompt, imagePayload);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text,
        citations: citations,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: err.message || "I'm sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError(err.message);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input, image);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion, null);
  };
  
  const handleRefresh = () => {
    setMessages([]);
    setError(null);
  };

  const Header = () => (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <ChatbotIcon className="h-10 w-10" />
          <div>
            <h1 className="text-lg font-bold text-gray-800">Agrona</h1>
            <p className="text-sm text-gray-500">Your USDA AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
            <button onClick={handleRefresh} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100">
                <RefreshIcon className="h-5 w-5" />
            </button>
            <button onClick={() => window.open('https://www.rd.usda.gov/', '_blank')} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100">
                <ExternalLinkIcon className="h-5 w-5" />
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100">
                <CloseIcon className="h-6 w-6" />
            </button>
        </div>
    </header>
  );

  const SuggestionButton = ({ text }: { text: string }) => (
    <button 
        onClick={() => handleSuggestionClick(text)} 
        className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all text-sm text-gray-800"
    >
        {text}
    </button>
  );

  const WelcomeScreen = () => (
    <div className="p-4 flex flex-col items-start h-full">
      <p className="text-gray-700 text-base mb-6">
        I'm Agrona, your guide to the U.S. Department of Agriculture. I can help you find information on services, programs, data, and more.
      </p>
      <div className="grid grid-cols-2 gap-3 w-full">
        <SuggestionButton text="Where can I find USDA crop data?" />
        <SuggestionButton text="Show me farmers' loan programs." />
        <SuggestionButton text="Give me the nutrition guidelines page." />
        <SuggestionButton text="How do I apply for USDA grants?" />
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-5 z-50 w-full max-w-md h-[70vh] bg-white rounded-lg shadow-2xl flex flex-col font-sans border border-gray-200 overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 bg-white">
        <div className="flex flex-col h-full">
          {messages.length === 0 ? <WelcomeScreen /> : (
            <div className="flex-1 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'model' && <BotIcon className="h-6 w-6 text-[#002f6c] flex-shrink-0 mt-1" />}
                  <div className={`w-full max-w-sm p-3 rounded-lg shadow-sm ${msg.role === 'user' ? 'bg-[#002f6c] text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {msg.image && <img src={msg.image} alt="User upload" className="rounded-md mb-2 max-h-40" />}
                    <div className="whitespace-pre-wrap text-sm"><MarkdownRenderer content={msg.text} /></div>
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 border-t pt-2">
                        <h4 className="font-bold text-xs mb-1">Sources:</h4>
                        <ul className="space-y-1">
                          {msg.citations.map((citation, index) => (
                            <li key={index} className="text-xs">
                              <a href={citation.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                {citation.title || citation.uri}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {msg.role === 'user' && <UserIcon className="h-6 w-6 text-gray-600 flex-shrink-0 mt-1" />}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                    <BotIcon className="h-6 w-6 text-[#002f6c] flex-shrink-0 mt-1" />
                    <div className="w-full max-w-sm p-3 rounded-lg shadow-sm bg-gray-100">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                        </div>
                    </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
      </main>
      <footer className="bg-white border-t p-3">
        {image && (
          <div className="p-2 pt-0">
            <div className="relative inline-block">
              <img src={image.url} alt="Preview" className="h-16 w-16 object-cover rounded" />
              <button type="button" onClick={handleRemoveImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">&times;</button>
            </div>
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="relative">
          <div className="flex items-center px-2 py-1 border border-gray-200 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:text-gray-800" disabled={isLoading}>
              <PaperclipIcon className="h-5 w-5" />
            </button>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleFormSubmit(e);
                }
              }}
              placeholder="Ask about USDA programs, data, or servi..."
              className="flex-1 bg-transparent border-0 focus:ring-0 resize-none self-center p-2 text-sm text-black"
              rows={1}
              disabled={isLoading}
            />
            <button type="submit" className="p-2 text-gray-500 rounded-full hover:bg-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed" disabled={isLoading || (!input.trim() && !image)}>
              <SendIcon className="h-5 w-5" />
            </button>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </form>
      </footer>
    </div>
  );
};

export default Chatbot;