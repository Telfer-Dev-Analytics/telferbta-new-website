import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { LinkedInIcon } from '../icons/LinkedInIcon';

export const Team = () => {
    const [ref, isVisible] = useScrollAnimation();
    const teamMembers = [
        { name: "Jessica Chen", role: "President", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop" },
        { name: "Michael Rodriguez", role: "VP Finance", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop" },
        { name: "Emily Carter", role: "VP Marketing", image: "https://images.unsplash.com/photo-1488426862026-39b533072b2c?q=80&w=2824&auto=format&fit=crop" },
        { name: "David Lee", role: "VP Internal", image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2942&auto=format&fit=crop" },
        { name: "Sarah Williams", role: "VP Events", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop" },
        { name: "Chris Evans", role: "VP Technology", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop" },
    ];
    const duplicatedTeamMembers = [...teamMembers, ...teamMembers];

    return (
        <section id="team" className="py-24 bg-background transition-colors duration-500 relative overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl" />
            <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center mb-16 max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-foreground">Meet the Team</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full" />
                </div>
                
                <div className="w-full overflow-hidden group" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
                    <div className="flex space-x-8 animate-scroll pause-on-hover">
                        {duplicatedTeamMembers.map((member, index) => (
                            <div key={index} className="flex-shrink-0 w-64 text-center">
                                <div className="relative">
                                    <img src={member.image} alt={member.name} className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-border shadow-lg"/>
                                    <div className="mt-4">
                                        <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                                        <p className="text-accent">{member.role}</p>
                                        <a href="#" className="mt-2 inline-block text-text-muted hover:text-accent transition-colors">
                                            <LinkedInIcon className="w-6 h-6"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};