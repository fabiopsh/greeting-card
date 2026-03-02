"use client";

import { useState } from "react";

export default function FlipCard({ card }: { card: any }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className={`min-h-screen ${card.themeId} transition-colors duration-500 pb-20 flex flex-col items-center justify-center overflow-x-hidden`}>
            <div className="container mx-auto px-4 py-8 mt-12 mb-12 max-w-2xl flex flex-col items-center w-full perspective-[1500px]">

                {/* 3D Flip Container using Grid for overlapping without fixed heights */}
                <div
                    className="w-full relative transition-[transform] duration-[800ms] ease-in-out [transform-style:preserve-3d] cursor-pointer grid"
                    style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front Face */}
                    <div className="[grid-area:1/1/2/2] w-full [backface-visibility:hidden]">
                        <div className="theme-card w-full h-full rounded-[2rem] overflow-hidden p-6 sm:p-10 flex flex-col items-center justify-start text-center shadow-2xl relative">

                            <h1 className="text-4xl sm:text-5xl font-bold mb-2">Happy Birthday, {card.recipientName}!</h1>
                            <p className="text-lg opacity-80 mb-6 font-medium">
                                {new Date(card.birthdayDate).toLocaleDateString(undefined, {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>

                            <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-8 shadow-inner border border-current/10">
                                <img
                                    src={card.photoUrl}
                                    alt={`Photo for ${card.recipientName}`}
                                    className="object-cover w-full h-full pointer-events-none"
                                />
                            </div>

                            <div className="w-full prose prose-lg max-w-none flex flex-col items-center justify-center">
                                <p className="whitespace-pre-wrap text-xl sm:text-2xl leading-relaxed italic font-medium">
                                    &quot;{card.mainMessage}&quot;
                                </p>
                            </div>

                            {/* Click to flip hint */}
                            <div className="mt-auto pt-8 w-full flex justify-center animate-bounce opacity-80">
                                <span className="text-sm font-bold uppercase tracking-widest bg-black/10 text-current px-5 py-2 rounded-full backdrop-blur-md border border-current/10 shadow-sm flex items-center gap-2">
                                    Click to flip card
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /></svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Back Face */}
                    <div className="[grid-area:1/1/2/2] w-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div className="theme-card w-full h-full rounded-[2rem] overflow-hidden p-6 sm:p-10 flex flex-col shadow-2xl relative">

                            <h2 className="text-3xl font-bold mb-8 text-center border-b border-current/20 pb-4">Messages from Friends</h2>

                            <div className="space-y-4 flex-grow flex flex-col justify-start">
                                {card.contributors && card.contributors.length > 0 ? (
                                    card.contributors.map((contrib: any) => (
                                        <div
                                            key={contrib.id}
                                            className="p-5 rounded-xl text-left bg-black/5 backdrop-blur-sm border border-current/10 shadow-sm transition-transform hover:scale-[1.01]"
                                        >
                                            <p className="font-bold text-lg mb-2 flex items-center gap-2 tracking-wide">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                {contrib.name}
                                            </p>
                                            {contrib.dedication && <p className="opacity-90 leading-relaxed pl-6 border-l-2 border-current/20 ml-2">{contrib.dedication}</p>}
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-full flex items-center justify-center opacity-60 italic text-lg py-12 border-2 border-dashed border-current/20 rounded-xl">
                                        <p>No dedications have been added yet.</p>
                                    </div>
                                )}
                            </div>

                            {/* Click to flip back hint */}
                            <div className="mt-auto pt-8 w-full flex justify-center opacity-80">
                                <span className="text-sm font-bold uppercase tracking-widest bg-black/10 text-current px-5 py-2 rounded-full backdrop-blur-md border border-current/10 shadow-sm flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v6h6" /><path d="M21 12A9 9 0 0 0 6 5.3L3 8" /><path d="M21 22v-6h-6" /><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" /></svg>
                                    Click to flip back
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
