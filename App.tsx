import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Chatbot from './components/Chatbot';
import { ChatBubbleIcon, CloseIcon } from './components/Icons';

const App: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="relative">
            <LandingPage />
            
            {/* Chatbot Floating Action Button */}
            <div className="fixed bottom-5 right-5 z-50">
                <button 
                    onClick={() => setIsChatOpen(!isChatOpen)} 
                    className="bg-[#002f6c] text-white p-4 rounded-full shadow-lg hover:bg-[#001e44] transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
                >
                    {isChatOpen ? <CloseIcon className="h-8 w-8" /> : <ChatBubbleIcon className="h-8 w-8" />}
                </button>
            </div>

            {/* Chatbot Window */}
            <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
}

export default App;