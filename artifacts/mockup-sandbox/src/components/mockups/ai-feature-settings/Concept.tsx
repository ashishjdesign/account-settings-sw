import React from 'react';
import {
  Search,
  LayoutGrid,
  Headphones,
  Gift,
  Bell,
  ChevronDown,
  ChevronsRight,
  Info,
  Sparkles,
  Phone,
  MessageSquare,
  Video,
  Calendar,
  Megaphone,
  MessageCircle,
  Printer,
  PlugZap,
  CreditCard,
  BarChart3,
} from 'lucide-react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

/**
 * -----------------------------------------------------------------------------
 * SCOPED TOKEN STYLES
 *
 * Two design systems coexist on this page. Their tokens are defined as CSS
 * custom properties on dedicated scope wrappers so they cannot bleed across
 * the seam:
 *   .swui-scope    → Service Web UI Library (admin chrome: header, sub-nav,
 *                    breadcrumb). Helvetica + RingCentral palette.
 *   .spring-scope  → Spring Design System (left nav + page panel). Inter
 *                    + --sui-colors-* tokens.
 * -----------------------------------------------------------------------------
 */
const scopedTokens = `
  .swui-scope {
    /* Service Web UI Library */
    --rc-brand: #0679BA;
    --rc-text-black: #2F2F2F;
    --rc-text-dark: #666666;
    --rc-text-medium: #999999;
    --rc-border-light: #E2E2E2;
    --rc-border-medium: #C7C7C7;
    --rc-bg-base: #FFFFFF;
    --rc-bg-fog: #FBFBFB;
    --rc-accent-orange: #FF8800;
    --rc-success-leaf: #1A8517;
    font-family: Helvetica, Arial, sans-serif;
    color: var(--rc-text-black);
  }

  .spring-scope {
    /* Spring Design System (subset used on this page) */
    --sui-colors-primary-b: #066fac;
    --sui-colors-primary-b-high-contrast: #0040dd;
    --sui-colors-neutral-base: #ffffff;
    --sui-colors-neutral-b0: #000000;
    --sui-colors-neutral-b1: #323439;
    --sui-colors-neutral-b2: #72757a;
    --sui-colors-neutral-b3: #9e9fa4;
    --sui-colors-neutral-b4: #dddfe5;
    --sui-radius-sm: 10px;
    --sui-radius-full: 9999px;
    font-family: Inter, system-ui, sans-serif;
    color: var(--sui-colors-neutral-b1);
  }
`;

/**
 * -----------------------------------------------------------------------------
 * SPRING-THEMED PRIMITIVES
 * -----------------------------------------------------------------------------
 */
const SpringSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & { focused?: boolean }
>(({ className, focused, ...props }, ref) => (
  <div
    className={cn(
      'relative inline-flex items-center justify-center',
      focused && 'rounded-full ring-2 ring-[var(--sui-colors-primary-b-high-contrast)] ring-offset-2 ring-offset-white',
    )}
  >
    <SwitchPrimitives.Root
      className={cn(
        'peer inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer items-center rounded-full transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sui-colors-primary-b-high-contrast)] focus-visible:ring-offset-2',
        'data-[state=checked]:bg-[var(--sui-colors-primary-b)] data-[state=unchecked]:bg-[var(--sui-colors-neutral-b3)]',
        className,
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block h-[20px] w-[20px] rounded-full bg-[var(--sui-colors-neutral-base)] shadow-sm ring-0 transition-transform',
          'data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-[2px]',
        )}
      />
    </SwitchPrimitives.Root>
  </div>
));
SpringSwitch.displayName = 'SpringSwitch';

const SpringPill: React.FC<React.PropsWithChildren<{ tone?: 'neutral' }>> = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-[var(--sui-colors-neutral-b4)] px-2.5 py-0.5 text-[13px] font-medium leading-[20px] text-[var(--sui-colors-neutral-b2)]">
    {children}
  </span>
);

/**
 * -----------------------------------------------------------------------------
 * MAIN COMPONENT
 * -----------------------------------------------------------------------------
 */
export function Concept() {
  return (
    <div className="min-h-[100dvh] w-full bg-white">
      <style>{scopedTokens}</style>

      {/* ============================================================ */}
      {/* SCOPE 1 — ADMIN PORTAL CHROME (Service Web UI Library)        */}
      {/* ============================================================ */}
      <div className="swui-scope w-full">
        {/* Header / Masterhead */}
        <div className="flex w-full justify-center border-b border-[var(--rc-border-light)] bg-[var(--rc-bg-base)]">
          <header className="flex h-[72px] w-[1200px] shrink-0 items-center justify-between px-4 xl:px-0">
            {/* Logo */}
            <div className="flex items-center text-[24px] font-bold tracking-tight text-[var(--rc-brand)]">
              <span className="mr-1 flex h-8 w-8 items-center justify-center rounded-sm bg-[var(--rc-brand)] text-[var(--rc-bg-base)]">
                R
              </span>
              RingCentral
            </div>

            {/* Search */}
            <div className="flex h-[34px] w-[480px] items-center rounded-sm border border-[var(--rc-border-medium)] bg-white px-3 focus-within:border-[var(--rc-brand)]">
              <Search className="mr-2 h-[13px] w-[13px] text-[var(--rc-text-dark)]" strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Search settings, pages, or help articles"
                className="w-full bg-transparent text-[13px] text-[var(--rc-text-black)] placeholder-[var(--rc-text-dark)] outline-none"
              />
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-5">
              <div className="flex cursor-pointer items-center gap-1 text-[13px] hover:text-[var(--rc-brand)]">
                <span>RingEX</span>
                <ChevronDown className="h-[14px] w-[14px]" strokeWidth={2} />
              </div>
              <div className="h-6 w-px bg-[var(--rc-border-light)]" />
              <div className="flex items-center gap-4 text-[var(--rc-text-dark)]">
                <button className="hover:text-[var(--rc-brand)]"><LayoutGrid className="h-[18px] w-[18px]" /></button>
                <button className="hover:text-[var(--rc-brand)]"><Headphones className="h-[18px] w-[18px]" /></button>
                <button className="hover:text-[var(--rc-brand)]"><Gift className="h-[18px] w-[18px]" /></button>
                <button className="relative hover:text-[var(--rc-brand)]">
                  <Bell className="h-[18px] w-[18px]" />
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--rc-accent-orange)]" />
                </button>
              </div>
              <div className="relative ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--rc-accent-orange)] text-[16px] font-bold text-white">
                RC
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[var(--rc-success-leaf)]" />
              </div>
            </div>
          </header>
        </div>

        {/* Sub nav */}
        <div className="flex w-full justify-center border-b border-[var(--rc-border-light)] bg-[var(--rc-bg-fog)]">
          <div className="flex h-[60px] w-[1200px] items-center gap-10 px-4 text-[13px] xl:px-0">
            <div className="cursor-pointer py-5">Home</div>
            <div className="cursor-pointer py-5">Users</div>
            <div className="cursor-pointer py-5">Phone System</div>
            <div className="flex cursor-pointer items-center gap-2 py-5">AI <ChevronDown className="h-3 w-3" /></div>
            <div className="cursor-pointer py-5">Meetings</div>
            <div className="flex cursor-pointer items-center gap-2 py-5">Reports <ChevronDown className="h-3 w-3" /></div>
            <div className="flex cursor-pointer items-center gap-2 py-5">Account <ChevronDown className="h-3 w-3" /></div>
            <div className="cursor-pointer border-b-2 border-[var(--rc-brand)] py-5 font-bold text-[var(--rc-brand)]">More</div>
          </div>
        </div>

        {/* Breadcrumb (chrome — Helvetica + RC palette) */}
        <div className="flex w-full justify-center bg-[var(--rc-bg-base)]">
          <div className="flex w-[1200px] items-center gap-1 px-4 pt-6 text-[13px] xl:px-0">
            <a className="cursor-pointer text-[var(--rc-brand)] hover:underline" href="#">Account Settings</a>
            <ChevronsRight className="h-3.5 w-3.5 text-[var(--rc-text-medium)]" />
            <span className="text-[var(--rc-text-black)]">Feature Controls</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SCOPE 2 — INNER FEATURE PANEL (Spring Design System)          */}
      {/* ============================================================ */}
      <div className="spring-scope flex w-full justify-center bg-white pb-24 pt-6">
        <div className="flex w-[1200px] items-start px-4 xl:px-0">
          {/* Left side nav (240 wide) */}
          <nav className="w-[240px] shrink-0 pr-[10px]">
            <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-[var(--sui-colors-neutral-b2)]">
              MORE
            </div>
            <ul className="flex flex-col gap-1 text-[14px] font-medium">
              {[
                { label: 'AI', icon: Sparkles, active: true },
                { label: 'Phone', icon: Phone },
                { label: 'Messaging', icon: MessageSquare },
                { label: 'Meetings', icon: Video },
                { label: 'Video', icon: Video },
                { label: 'Webinar', icon: Megaphone },
                { label: 'Events', icon: Calendar },
                { label: 'SMS', icon: MessageCircle },
                { label: 'Fax', icon: Printer },
                { label: 'Contact center', icon: Headphones },
                { label: 'Integrations', icon: PlugZap },
                { label: 'Billing', icon: CreditCard },
                { label: 'Analytics', icon: BarChart3 },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    className={cn(
                      'relative flex h-[40px] w-full items-center gap-2.5 rounded-full px-3 text-left transition-colors',
                      item.active
                        ? 'bg-[var(--sui-colors-neutral-b4)] text-[var(--sui-colors-primary-b)]'
                        : 'bg-transparent text-[var(--sui-colors-neutral-b1)] hover:bg-[var(--sui-colors-neutral-b4)]',
                    )}
                  >
                    {item.active && (
                      <div className="absolute left-0 h-5 w-[2px] rounded-r-full bg-[var(--sui-colors-primary-b)]" />
                    )}
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Page area (1000 wide minus 240 nav inside 1200, with gutter) */}
          <main className="flex-1 pl-[20px]">
            {/* Page title */}
            <h1 className="mb-6 text-[20px] font-semibold leading-[28px] tracking-[-0.2px] text-[var(--sui-colors-neutral-b0)]">
              AI Receptionist personality
            </h1>

            {/* Pill tabs */}
            <div className="mb-8 flex gap-1">
              {['General', 'Receptionist', 'Notes', 'Transcripts', 'Recaps', 'Writing'].map((tab, i) => (
                <button
                  key={tab}
                  className={cn(
                    'flex h-[32px] items-center justify-center rounded-full px-4 text-[14px] font-medium leading-[20px] transition-colors',
                    i === 0
                      ? 'bg-[var(--sui-colors-neutral-b1)] text-white'
                      : 'bg-transparent text-[var(--sui-colors-neutral-b2)] hover:bg-[var(--sui-colors-neutral-b4)]',
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Master row */}
            <div className="mb-8 border-b border-[var(--sui-colors-neutral-b4)] pb-8">
              <div className="flex items-start justify-between gap-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sui-colors-neutral-b4)] text-[var(--sui-colors-primary-b)]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b0)]">AI features</h2>
                    <p className="mt-1 max-w-[760px] text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                      Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools.{' '}
                      <a href="#" className="font-medium text-[var(--sui-colors-primary-b)] hover:underline">
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>
                <div className="mt-1 shrink-0">
                  <SpringSwitch checked />
                </div>
              </div>
            </div>

            {/* User defaults */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b0)]">User defaults</h3>
                  <Info className="h-4 w-4 text-[var(--sui-colors-neutral-b2)]" />
                </div>
                <SpringPill>98/98 users using default</SpringPill>
              </div>

              <div className="flex flex-col gap-2">
                {/* Child 1 — hover/focus state */}
                <div className="flex min-h-[80px] items-start justify-between gap-4 rounded-[10px] bg-[var(--sui-colors-neutral-b4)]/40 p-4">
                  <div className="max-w-[700px]">
                    <h4 className="text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b0)]">Real-time AI answers</h4>
                    <p className="mt-1 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                      Surface relevant answers and suggestions during live calls and meetings so reps stay confident without leaving the conversation.
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center">
                    <SpringSwitch checked focused />
                  </div>
                </div>

                {/* Child 2 — overridden */}
                <div className="flex min-h-[80px] items-start justify-between gap-4 rounded-[10px] p-4 transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40">
                  <div className="max-w-[700px]">
                    <h4 className="text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b0)]">Call notes</h4>
                    <p className="mt-1 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                      Automatically capture key moments and action items from every call so nothing falls through the cracks.
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <SpringPill>Overridden by 4 users</SpringPill>
                    <SpringSwitch checked />
                  </div>
                </div>

                {/* Child 3 — customizable */}
                <div className="flex min-h-[80px] items-start justify-between gap-4 rounded-[10px] p-4 transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40">
                  <div className="max-w-[700px]">
                    <h4 className="text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b0)]">Transcripts</h4>
                    <p className="mt-1 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                      Generate accurate transcripts for calls and meetings, with speaker labels and searchable history.
                    </p>
                    <button className="mt-1 text-[14px] font-medium leading-[20px] text-[var(--sui-colors-primary-b)] hover:underline">
                      Customize
                    </button>
                  </div>
                  <div className="flex shrink-0 items-center">
                    <SpringSwitch checked />
                  </div>
                </div>

                {/* Child 4 — OFF */}
                <div className="flex min-h-[80px] items-start justify-between gap-4 rounded-[10px] p-4 transition-colors hover:bg-[var(--sui-colors-neutral-b4)]/40">
                  <div className="max-w-[700px]">
                    <h4 className="text-[15px] font-bold leading-[20px] text-[var(--sui-colors-neutral-b0)]">Writing assist</h4>
                    <p className="mt-1 text-[14px] leading-[20px] text-[var(--sui-colors-neutral-b2)]">
                      Help users draft clearer messages with built-in tone, polish and translation suggestions.
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center">
                    <SpringSwitch checked={false} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
