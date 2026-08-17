import React, { useState } from 'react';

// Reusable SVG components for the mockup
const ToggleOn = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="24" rx="12" fill="#0684BD" />
    <circle cx="28" cy="12" r="10" fill="white" />
  </svg>
);

const ToggleOff = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="24" rx="12" fill="#D7D7D7" />
    <circle cx="12" cy="12" r="10" fill="white" />
  </svg>
);

const CheckboxChecked = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="3" fill="#0684BD" />
    <path d="M11.3334 5.5L6.75008 10.0833L4.66675 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckboxUnchecked = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="15" height="15" rx="2.5" fill="white" stroke="#D7D7D7" />
  </svg>
);

const IconPlaceholder = () => (
  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2V14M2 8H14" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export function ConceptB() {
  const [ccOn, setCcOn] = useState(true);
  const [ltOn, setLtOn] = useState(true);
  const [cnOn, setCnOn] = useState(true);
  const [autoOn, setAutoOn] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 font-sans" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Tab Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-6">
          <div className="text-[14px] text-[#666] font-medium cursor-pointer">General</div>
          <div className="text-[14px] text-[#0684BD] font-semibold border-b-2 border-[#0684BD] pb-[17px] -mb-[17px] cursor-pointer">AI</div>
          <div className="text-[14px] text-[#666] font-medium cursor-pointer">Audio</div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-3">
          {/* Closed Captioning Card (Parent) */}
          <div className="border border-gray-200 rounded-xl px-5 py-4 bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <IconPlaceholder />
              <div>
                <div className="text-[14px] font-semibold text-[#282829]">Closed captioning</div>
                <div className="text-[13px] text-[#666]">Display text for spoken words during a meeting</div>
              </div>
            </div>
            <div className="cursor-pointer" onClick={() => setCcOn(!ccOn)}>
              {ccOn ? <ToggleOn /> : <ToggleOff />}
            </div>
          </div>

          {/* Live Transcripts Card (Child) */}
          <div className="border border-gray-200 rounded-xl px-5 py-4 bg-white flex items-center justify-between ml-10">
            <div className="flex items-center gap-4">
              <IconPlaceholder />
              <div>
                <div className="text-[14px] font-semibold text-[#282829]">Live transcripts</div>
                <div className="text-[13px] text-[#666]">Show a real-time transcript of the conversation</div>
              </div>
            </div>
            <div className="cursor-pointer" onClick={() => setLtOn(!ltOn)}>
              {ltOn ? <ToggleOn /> : <ToggleOff />}
            </div>
          </div>

          {/* Standalone In-call Behavior Section */}
          <div className="ml-10 py-2 pl-[48px]"> {/* 48px = 32px icon + 16px gap to align with child card text */}
            <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
              In-call behavior
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 cursor-pointer" onClick={() => setAutoOn(!autoOn)}>
                {autoOn ? <CheckboxChecked /> : <CheckboxUnchecked />}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#282829] cursor-pointer" onClick={() => setAutoOn(!autoOn)}>
                  Keep Notes on automatically during calls
                </div>
                <div className="text-[13px] text-[#666] mt-0.5">
                  Live transcripts and Call notes start on when a call begins.
                </div>
                <div className="text-[12px] text-gray-500 italic mt-1">
                  When Call notes is off, applies to Live transcripts only.
                </div>
              </div>
            </div>
          </div>

          {/* Call Notes Card (Child) */}
          <div className="border border-gray-200 rounded-xl px-5 py-4 bg-white flex items-center justify-between ml-10">
            <div className="flex items-center gap-4">
              <IconPlaceholder />
              <div>
                <div className="text-[14px] font-semibold text-[#282829]">Call notes</div>
                <div className="text-[13px] text-[#666]">Generate AI summaries and action items from the call</div>
                {!cnOn && (
                  <div className="text-[12px] text-gray-500 italic mt-1">
                    Currently disabled. Notes will not be generated.
                  </div>
                )}
              </div>
            </div>
            <div className="cursor-pointer" onClick={() => setCnOn(!cnOn)}>
              {cnOn ? <ToggleOn /> : <ToggleOff />}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
