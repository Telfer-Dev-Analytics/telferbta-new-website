import React, { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Helper component for individual event cards (Updated)
const EventCard = ({ event, isVisible, index }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [isPast, setIsPast] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);
    const cardRef = useRef(null);

    // 3D Tilt Effect Logic from MissionCard
    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        // Key Change: Increased the divisor from 15 to 25 to reduce tilt
        const x = (clientX - left - width / 2) / 55;
        const y = (clientY - top - height / 2) / 55;

        currentTarget.style.transition = 'transform 0.1s linear';
        currentTarget.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    };


    useEffect(() => {
        const eventDate = new Date(event.date);
        const now = new Date();

        if (eventDate < now) {
            setIsPast(true);
            return;
        }

        const timer = setInterval(() => {
            const now = new Date();
            const difference = eventDate - now;

            if (difference <= 0) {
                setIsPast(true);
                setTimeLeft('');
                clearInterval(timer);
                return;
            }
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            if (days <= 3) {
                setShowCountdown(true);
                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }

        }, 1000);

        return () => clearInterval(timer);
    }, [event.date]);

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                transition: `opacity 0.5s, transform 0.5s`,
                transitionDelay: `${index * 150}ms` 
            }} 
            className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-background/50 backdrop-blur-lg shadow-lg ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
            <div className="relative z-10 flex flex-col h-full">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover"/>
                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mt-2 mb-2 text-foreground">{event.title}</h3>
                    <p className="text-text-muted flex-grow">{event.description}</p>
                    <div className="mt-4 pt-4 border-t border-border">
                         {showCountdown && !isPast ? (
                            <p className="text-sm font-semibold text-accent countdown-text">{timeLeft} left</p>
                        ) : (
                            <p className="text-sm text-text-muted">{formattedDate}</p>
                        )}
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <button 
                        disabled={isPast}
                        className={`w-full py-2 px-4 rounded-full font-bold transition-all duration-300 ${isPast ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'join-button'}`}
                    >
                        {isPast ? 'Event Ended' : 'Sign Up'}
                    </button>
                </div>
            </div>
             <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
    );
};


export const Events = () => {
    const [ref, isVisible] = useScrollAnimation();
    // Dates updated for testing countdown and disabled states
    const events = [
        { title: "TechTalk: AI in Finance", date: "2025-07-25T18:00:00", description: "Explore how AI is revolutionizing the financial sector with guest speakers from top firms.", image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=2832&auto=format&fit=crop" },
        { title: "Networking Night", date: "2025-11-05T18:00:00", description: "Connect with professionals from Ottawa's thriving tech scene.", image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2940&auto=format&fit=crop" },
        { title: "Case Competition", date: "2025-01-20T09:00:00", description: "Solve real-world business technology challenges and win prizes.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop" },
    ];

    return (
        <section id="events" className="py-24 bg-transparent relative"> 
            <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 relative ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground">Upcoming Events</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full" />
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <EventCard key={index} event={event} isVisible={isVisible} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};