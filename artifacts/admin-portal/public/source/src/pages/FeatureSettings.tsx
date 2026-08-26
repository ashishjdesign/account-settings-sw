import React, { useState, useEffect } from 'react';
import { useLocation, useSearch } from "wouter";
import { PillTab } from '../components/shared';
import GeneralPanel from "./tabs/GeneralPanel";
import PhonePanel from "./tabs/PhonePanel";
import AiPanel from "./tabs/AiPanel";
import SmsPanel from "./tabs/SmsPanel";
import FaxPanel from "./tabs/FaxPanel";

type TabKey = 'general' | 'phone' | 'ai' | 'sms' | 'fax';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'general', label: 'General' },
  { key: 'phone', label: 'Phone' },
  { key: 'ai', label: 'AI' },
  { key: 'sms', label: 'SMS' },
  { key: 'fax', label: 'Fax' },
];

export default function FeatureSettings({ tab }: { tab: string }) {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const [loading, setLoading] = useState(true);

  // Load effect
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, [tab]);

  const activeTab = TABS.find(t => t.key === tab) ? tab as TabKey : 'general';

  // When an AI sub-feature detail view is open (?detail=ava|closedCaptioning),
  // the panel takes over the whole surface (back arrow + title), so the page
  // heading and product tabs are hidden — matching the canvas design.
  const detailParam = new URLSearchParams(search).get('detail');
  const isAiDetail =
    activeTab === 'ai' &&
    (detailParam === 'ava' || detailParam === 'phoneAi' || detailParam === 'chatAi');

  const handleTabClick = (k: TabKey) => {
    setLocation(`/feature-settings/${k}`);
  };

  return (
    <>
      {!isAiDetail && (
        <>
          <h1 className="mb-5 flex h-[40px] items-center text-[20px] font-semibold leading-[28px] tracking-[-0.2px] text-[var(--sui-colors-neutral-b1)]">
            Feature Settings
          </h1>

          <div className="mb-6 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <PillTab
                key={t.key}
                label={t.label}
                selected={activeTab === t.key}
                onClick={() => handleTabClick(t.key)}
              />
            ))}
          </div>
        </>
      )}

      {loading ? (
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
          <div className="h-[120px] w-full animate-pulse rounded-[8px] bg-slate-100" />
          <div className="h-[120px] w-full animate-pulse rounded-[8px] bg-slate-100" />
          <div className="h-[120px] w-full animate-pulse rounded-[8px] bg-slate-100" />
        </div>
      ) : (
        <div className="animate-in fade-in duration-300">
          {activeTab === 'general' && <GeneralPanel />}
          {activeTab === 'phone' && <PhonePanel />}
          {activeTab === 'ai' && <AiPanel />}
          {activeTab === 'sms' && <SmsPanel />}
          {activeTab === 'fax' && <FaxPanel />}
        </div>
      )}
    </>
  );
}
