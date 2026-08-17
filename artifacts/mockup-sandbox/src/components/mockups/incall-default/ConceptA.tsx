import React, { useState } from 'react';

const Toggle = ({ isOn, onChange }: { isOn: boolean; onChange: (val: boolean) => void }) => {
  return (
    <div 
      className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isOn ? 'bg-[#0684BD]' : 'bg-gray-300'}`}
      onClick={() => onChange(!isOn)}
    >
      <div 
        className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${isOn ? 'translate-x-4' : 'translate-x-0'}`} 
      />
    </div>
  );
};

const Checkbox = ({ isChecked, onChange, label, sublabel, secondaryNote }: { isChecked: boolean; onChange: (val: boolean) => void; label: string; sublabel: string; secondaryNote: string }) => {
  return (
    <div className="flex items-start gap-3">
      <div 
        className="mt-0.5 relative flex items-center justify-center w-4 h-4 rounded border cursor-pointer shrink-0"
        style={{ 
          backgroundColor: isChecked ? '#0684BD' : 'white', 
          borderColor: isChecked ? '#0684BD' : '#D7D7D7' 
        }}
        onClick={() => onChange(!isChecked)}
      >
        {isChecked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <div className="flex-1 cursor-pointer select-none" onClick={() => onChange(!isChecked)}>
        <div className="text-[14px] font-semibold text-[#282829] leading-snug mb-0.5">{label}</div>
        {sublabel && <div className="text-[13px] text-[#666666] leading-snug">{sublabel}</div>}
        {secondaryNote && <div className="text-[12px] text-[#666666] italic mt-1 leading-snug opacity-80">{secondaryNote}</div>}
      </div>
    </div>
  );
};

export function ConceptA() {
  const [ccOn, setCcOn] = useState(true);
  const [ltOn, setLtOn] = useState(true);
  const [cnOn, setCnOn] = useState(true);
  const [autoOn, setAutoOn] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex py-10 font-sans" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col gap-3">
        
        {/* Tab Header */}
        <div className="flex border-b border-gray-200 mb-2">
          <div className="px-4 py-3 border-b-2 border-[#0684BD] text-[#0684BD] font-semibold text-sm">
            AI
          </div>
          <div className="px-4 py-3 text-[#666] font-medium text-sm">
            General
          </div>
          <div className="px-4 py-3 text-[#666] font-medium text-sm">
            Voicemail
          </div>
        </div>

        <h2 className="text-lg font-semibold text-[#282829] mb-2 mt-2">During calls</h2>

        {/* Closed Captioning - Parent */}
        <div className="border border-gray-200 rounded-xl px-5 py-4 bg-white flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[#282829]">Closed captioning</div>
              <div className="text-[13px] text-[#666666]">Display spoken words as text at the bottom of the screen.</div>
            </div>
          </div>
          <Toggle isOn={ccOn} onChange={setCcOn} />
        </div>

        {/* Live Transcripts - Child */}
        <div className="ml-10 border border-gray-200 rounded-xl px-5 py-4 bg-white flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#282829]">Live transcripts</div>
                <div className="text-[13px] text-[#666666]">Generate a real-time transcript panel during the meeting.</div>
              </div>
            </div>
            <Toggle isOn={ltOn} onChange={setLtOn} />
          </div>

          {/* Sub-row for Live Transcripts */}
          <div className="border-t border-gray-100 mt-4 pt-4">
            <div className="ml-12">
              <Checkbox 
                isChecked={autoOn} 
                onChange={setAutoOn} 
                label="Keep Notes on automatically during calls"
                sublabel="Live transcripts and Call notes start on when a call begins."
                secondaryNote="When Call notes is off, applies to Live transcripts only."
              />
            </div>
          </div>
        </div>

        {/* Call Notes - Child */}
        <div className={`ml-10 border border-gray-200 rounded-xl px-5 py-4 bg-white flex items-center justify-between transition-opacity ${!cnOn ? 'opacity-60 grayscale-[0.2]' : ''}`}>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[#282829]">Call notes</div>
              <div className="text-[13px] text-[#666666]">AI-generated summaries and action items available after the call.</div>
              {!cnOn && (
                <div className="text-[12px] text-amber-600 mt-1 italic">
                  Call notes are currently turned off.
                </div>
              )}
            </div>
          </div>
          <Toggle isOn={cnOn} onChange={setCnOn} />
        </div>

      </div>
    </div>
  );
}
