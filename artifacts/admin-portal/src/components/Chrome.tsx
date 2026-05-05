import React from 'react';
import { Link, useLocation } from "wouter";
import { RingCentralLogo, AppsResourcesIcon, NavSettingsIcon, SecurityComplianceIcon, ServiceConsoleIcon } from './shared';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { useSettings } from '../store';

function Row({
  icon, label, labelColor, trailing, selected, href
}: {
  icon?: React.ReactNode; label: string; labelColor?: string;
  trailing?: 'chev-right' | 'chev-down'; selected?: boolean;
  href?: string;
}) {
  const content = (
    <div
      className="flex min-h-[40px] w-[190px] shrink-0 items-center gap-[5px] transition-colors focus-within:ring-2 focus-within:ring-[var(--rc-blue)] outline-none"
      style={{ backgroundColor: selected ? '#F4F4F4' : '#FBFBFB', paddingLeft: selected ? 0 : 10, paddingRight: 10 }}
    >
      {selected && <div className="w-[4px] shrink-0 self-stretch bg-[#0679BA]" />}
      <div className="flex min-w-0 flex-1 items-center gap-[10px] py-[8px]">
        <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">{icon}</div>
        <p
          className="min-w-0 flex-1 text-[13px] leading-[1.54] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden"
          style={{ color: labelColor || (selected ? '#0679BA' : '#2F2F2F') }}
        >
          {label}
        </p>
      </div>
      {trailing === 'chev-right' && <ChevronRight className="h-[13px] w-[13px] shrink-0 text-[#2F2F2F]" strokeWidth={1.6} />}
      {trailing === 'chev-down' && <ChevronDown className="h-[13px] w-[13px] shrink-0 text-[#0679BA]" strokeWidth={1.6} />}
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }
  
  return <button className="block text-left w-full focus:outline-none">{content}</button>;
}

function SideNav() {
  const [loc] = useLocation();
  const isFeatureSettings = loc.startsWith('/feature-settings');

  return (
    <aside
      className="shrink-0 rounded-[4px] border border-[#E2E2E2] bg-[#FBFBFB] py-[10px]"
      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
      <Row icon={<ServiceConsoleIcon />} label="Service Console" trailing="chev-right" href="/service-console" />
      <Row icon={<NavSettingsIcon />} label="Account Settings" labelColor="#0679BA" trailing="chev-down" href="/account-settings" />
      <Row label="Feature Settings" selected={isFeatureSettings} href="/feature-settings/general" />
      {['Appearance', 'App Integrations', 'Archiver Settings', 'Directory Integration', 'Headset Support', 'Microsoft Teams', 'Multi-Site Settings', 'Outbound Call Prefix'].map((l) => (
        <Row key={l} label={l} href={`/${l.toLowerCase().replace(/\s+/g, '-')}`} />
      ))}
      <Row icon={<SecurityComplianceIcon />} label="Security and Compliance" trailing="chev-right" href="/security" />
      <Row icon={<AppsResourcesIcon />} label="Apps and Resources" trailing="chev-right" href="/apps" />
    </aside>
  );
}

export default function Chrome({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useSettings();

  return (
    <div className="relative flex min-h-[960px] w-full flex-col bg-white">
      {/* CHROME — Service Web UI Library */}
      <div className="swui-scope mx-auto w-[1200px] max-w-full">
        {/* Masterhead */}
        <header className="flex h-[64px] w-full min-w-0 items-center justify-between gap-4 bg-white">
          <div className="min-w-0 shrink">
            <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rc-blue)] rounded-sm">
              <RingCentralLogo />
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-[13px] text-[var(--rc-text)] sm:gap-5">
            <button className="flex items-center gap-1.5 hover:text-[var(--rc-blue)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rc-blue)] rounded-sm">
              <span className="hidden sm:inline">Admin Portal</span>
              <ChevronDown className="h-[13px] w-[13px]" strokeWidth={1.6} />
            </button>
            <button className="text-[var(--rc-text-muted)] hover:text-[var(--rc-blue)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rc-blue)] rounded-sm p-1">
              <AppsResourcesIcon color="currentColor" />
            </button>
            
            <button 
              onClick={() => dispatch({ type: 'TOGGLE_SIMULATE_ERROR' })}
              className="text-[12px] font-mono p-1 border rounded opacity-50 hover:opacity-100"
              title="Toggle simulate save failure"
            >
              {state.simulateError ? 'Err: ON' : 'Err: OFF'}
            </button>

            <button className="relative ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--rc-orange)] text-[12px] font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--rc-blue)]">
              RC
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--rc-success)]" />
            </button>
          </div>
        </header>

        {/* Sub-nav with search on the right */}
        <div className="flex h-[52px] w-full min-w-0 items-center justify-between gap-4 bg-white text-[13px]">
          <nav className="flex h-full min-w-0 flex-1 items-center gap-4 overflow-x-auto whitespace-nowrap lg:gap-9 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {[
              ['Home', false],
              ['Users', false],
              ['Phone System', false],
              ['AI', true],
              ['Meetings', false],
              ['Reports', true],
              ['Account', true],
            ].map(([label, hasChev]) => (
              <button
                key={label as string}
                className="flex h-full shrink-0 items-center gap-1.5 text-[var(--rc-text)] hover:text-[var(--rc-blue)] focus:outline-none focus-visible:text-[var(--rc-blue)]"
              >
                <span>{label}</span>
                {hasChev && <ChevronDown className="h-[13px] w-[13px]" strokeWidth={1.6} />}
              </button>
            ))}
            <button className="relative flex h-full shrink-0 items-center font-medium text-[var(--rc-blue)] focus:outline-none">
              <span>More</span>
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--rc-blue)]" />
            </button>
          </nav>

          <div className="flex h-[34px] w-full max-w-[300px] min-w-[160px] shrink-0 basis-[260px] items-center rounded-[2px] border border-[var(--rc-border-strong)] bg-white px-3 focus-within:border-[var(--rc-blue)] focus-within:ring-1 focus-within:ring-[var(--rc-blue)] transition-all">
            <input
              type="text"
              placeholder="Search settings, pages, or help articles"
              className="w-full min-w-0 bg-transparent text-[12.5px] text-[var(--rc-text)] placeholder-[var(--rc-text-faint)] outline-none"
            />
            <Search className="ml-2 h-[14px] w-[14px] shrink-0 text-[var(--rc-text-muted)]" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Full-bleed separator under the sub-nav */}
      <div className="w-full border-b border-[#E2E2E2]" />

      {/* BODY */}
      <div className="flex w-full flex-1 justify-center bg-white px-4 pt-6 sm:px-6 lg:px-10">
        <div className="flex w-[1200px] max-w-full gap-[10px]">
          <div className="swui-scope">
            <SideNav />
          </div>

          <main className="spring-scope flex flex-1 flex-col px-[16px] pb-10 pt-[10px] min-w-0">
            {children}
            
            <div className="swui-scope mt-auto pt-10 text-[11px] leading-[16px] text-[var(--rc-text-faint)]">
              <a href="#" className="text-[var(--rc-blue)] underline hover:text-blue-800">Legal</a>
              <a href="#" className="ml-1 text-[var(--rc-blue)] underline hover:text-blue-800">Privacy</a>
              <p className="mt-1">© 1999–2025 RingCentral Intellectual Property.</p>
              <p>All rights reserved. RingCentral and the RingCentral logo are trademarks of RingCentral, Inc.</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
