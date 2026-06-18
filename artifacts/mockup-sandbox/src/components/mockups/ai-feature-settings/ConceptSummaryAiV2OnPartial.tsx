import React from 'react';
import { AiStarsMd, AvaMd, CallMd, Ivamd, AiWriterAltMd } from '@ringcentral/spring-icon';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard, ParentCard } from './_chrome';
import { ConceptSummaryAiV2AvaDetail } from './ConceptSummaryAiV2AvaDetail';
import { ConceptSummaryAiV2PhoneAiDetail } from './ConceptSummaryAiV2PhoneAiDetail';
import { ConceptSummaryAiV2ChatAiDetail } from './ConceptSummaryAiV2ChatAiDetail';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Master ON (full layout, Figma 2445-5411)
 *
 * The master "AI features" toggle is ON, so every AI setting is visible and
 * turned on. Features are grouped into parent cards (no category section
 * titles):
 *   AI features (master)
 *   AVA       — parent → inner page (5 features)
 *   Phone AI  — parent → inner page (Closed captioning + dependents, AI
 *               voicemail summaries)
 *   Chat AI   — parent → inner page (AI writer for messaging, AI summary, AI
 *               translation)
 *   AI writer for SMS — flat card
 *
 * Parent cards (AVA, Phone AI, Chat AI) show an "N features" badge + CaretRight
 * chevron instead of a switch — the chevron opens the feature's inner page where
 * its own switches live. This is an architecture-only regrouping; per-feature
 * management UX is unchanged.
 * --------------------------------------------------------------------------- */

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp }: { as: IconCmp }) => (
  <Cmp width={20} height={20} fill="currentColor" aria-hidden focusable={false} />
);

const ALLOWED = [
  { label: 'User default:', value: 'On' },
  { label: 'User access:', value: 'Allowed' },
];

export function ConceptSummaryAiV2OnPartial() {
  const [page, setPage] = React.useState<'main' | 'ava' | 'phoneAi' | 'chatAi'>('main');

  if (page === 'ava') {
    return <ConceptSummaryAiV2AvaDetail onBack={() => setPage('main')} />;
  }

  if (page === 'phoneAi') {
    return <ConceptSummaryAiV2PhoneAiDetail onBack={() => setPage('main')} />;
  }

  if (page === 'chatAi') {
    return <ConceptSummaryAiV2ChatAiDetail onBack={() => setPage('main')} />;
  }

  return (
    <FeatureSettingsShell flexLayout showFooterActions={false}>
      <PillTabs selected="AI" />

      <div className="flex flex-col gap-4">
        {/* Master */}
        <SettingCard
          title="AI features"
          icon={<SpringIcon as={AiStarsMd} />}
          switchOn
          description="Turn on AI support for calls, messages and video meetings. Deliver real-time answers, call notes, transcripts and meeting recaps to help teams stay focused and organized. Empower users to communicate clearly with built-in writing and polishing tools."
          summary={[{ label: 'AI data custom retention period:', value: 'Disabled' }]}
        />

        {/* AVA — parent of 5 features */}
        <ParentCard
          title="AVA"
          icon={<SpringIcon as={AvaMd} />}
          featureCount={5}
          description="A personal assistant that helps you boost productivity."
          onOpen={() => setPage('ava')}
        />

        {/* Phone AI — parent grouping the phone-related AI features (Closed
         * captioning + dependents, AI voicemail summaries) */}
        <ParentCard
          title="Phone AI"
          icon={<SpringIcon as={CallMd} />}
          featureCount={4}
          description="XXX."
          onOpen={() => setPage('phoneAi')}
        />

        {/* Chat AI — parent grouping the chat-related AI features */}
        <ParentCard
          title="Chat AI"
          icon={<SpringIcon as={Ivamd} />}
          featureCount={3}
          description="XXX."
          onOpen={() => setPage('chatAi')}
        />

        {/* AI writer for SMS stays a flat card (no grouping) */}
        <SettingCard
          title="AI writer for SMS"
          icon={<SpringIcon as={AiWriterAltMd} />}
          switchOn
          description="Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages."
          summary={ALLOWED}
        />
      </div>
    </FeatureSettingsShell>
  );
}
