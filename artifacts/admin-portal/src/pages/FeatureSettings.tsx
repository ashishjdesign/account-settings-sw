import React, { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import { PillTab, showToast, SpringConfirmDialog, SettingCard, SpringDialog, UserDefaultsRow } from '../components/shared';
import { useSettings } from '../store';
import { Skeleton } from "@/components/ui/skeleton";
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
  const { state, dispatch } = useSettings();
  const [loading, setLoading] = useState(true);

  // Load effect
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, [tab]);

  const activeTab = TABS.find(t => t.key === tab) ? tab as TabKey : 'general';

  const handleTabClick = (k: TabKey) => {
    setLocation(`/feature-settings/${k}`);
  };

  return (
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

      {loading ? (
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
          <Skeleton className="h-[120px] w-full rounded-[8px] bg-slate-100" />
          <Skeleton className="h-[120px] w-full rounded-[8px] bg-slate-100" />
          <Skeleton className="h-[120px] w-full rounded-[8px] bg-slate-100" />
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

      {/* Footer actions - not needed for this mockup per instruction, but we can render empty */}
      <div className="mt-5 flex justify-end gap-2"></div>
    </>
  );
}
