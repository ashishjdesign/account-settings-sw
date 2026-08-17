import React from 'react';

const Toggle = ({ checked = false }) => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="24" rx="12" fill={checked ? "#0684BD" : "#D7D7D7"} />
    <circle cx={checked ? "28" : "12"} cy="12" r="10" fill="white" style={{ transition: 'all 0.2s' }} />
  </svg>
);

const Checkbox = ({ checked = false }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
    <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill={checked ? "#0684BD" : "white"} stroke={checked ? "#0684BD" : "#D7D7D7"} />
    {checked && (
      <path d="M4 8L7 11L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);

const FeatureIcon = () => (
  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export function ConceptC() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#282829]">
      <div className="max-w-2xl mx-auto p-6">
        
        {/* Tabs */}
        <div className="flex border-b border-[#D7D7D7] mb-6">
          <div className="px-4 py-2 border-b-2 border-[#0684BD] text-[#0684BD] font-semibold text-sm">
            AI
          </div>
          <div className="px-4 py-2 text-[#666] font-medium text-sm">
            General
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-[#282829]">During calls</h2>
          
          {/* Card Wrapper for CC Family */}
          <div className="border border-[#D7D7D7] rounded-xl bg-white overflow-hidden flex flex-col shadow-sm">
            
            {/* CC Parent Row */}
            <div className="px-5 py-4 flex gap-4 items-start bg-white">
              <FeatureIcon />
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-[#282829]">Closed captioning</div>
                <div className="text-[13px] text-[#666] mt-0.5">
                  Display real-time captions for the active speaker.
                </div>
              </div>
              <div className="pt-1">
                <Toggle checked={true} />
              </div>
            </div>

            <div className="border-t border-gray-100 ml-[72px]"></div>

            {/* LT Child Row */}
            <div className="px-5 py-4 flex gap-4 items-start bg-white pl-[60px]">
              <FeatureIcon />
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-[#282829]">Live transcripts</div>
                <div className="text-[13px] text-[#666] mt-0.5">
                  Show a real-time transcript panel during the call.
                </div>
              </div>
              <div className="pt-1">
                <Toggle checked={true} />
              </div>
            </div>

            <div className="border-t border-gray-100 ml-[72px]"></div>

            {/* Call Notes Child Row */}
            <div className="px-5 py-4 flex gap-4 items-start bg-white pl-[60px]">
              <FeatureIcon />
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-[#282829]">Call notes</div>
                <div className="text-[13px] text-[#666] mt-0.5">
                  Automatically generate summary and action items.
                </div>
              </div>
              <div className="pt-1">
                <Toggle checked={true} />
              </div>
            </div>

            {/* Group Footer */}
            <div className="px-5 py-4 bg-gray-50 border-t border-[#D7D7D7] flex items-start gap-3">
              <Checkbox checked={true} />
              <div className="flex-1">
                <div className="text-[14px] font-medium text-[#282829] leading-tight mt-0.5">
                  Keep Notes on automatically during calls
                </div>
                <div className="text-[13px] text-[#666] mt-1 leading-snug">
                  Live transcripts and Call notes start on when a call begins.
                </div>
                <div className="text-[12px] text-[#666] italic mt-1.5 opacity-80">
                  When Call notes is off, applies to Live transcripts only.
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
