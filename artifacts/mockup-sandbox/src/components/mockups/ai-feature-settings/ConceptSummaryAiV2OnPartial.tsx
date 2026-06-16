import React from 'react';
import {
  AiStarsMd,
  AvaMd,
  ClosedCaptionsMd,
  VoicemailMd,
  AiWriterAltMd,
  AiSummaryMd,
  GlobeMd,
} from '@ringcentral/spring-icon';
import { FeatureSettingsShell } from './_shared';
import { PillTabs, SettingCard, ParentCard, SectionHeading } from './_chrome';

/* -----------------------------------------------------------------------------
 * AI Feature Settings — V2 — Master ON (full layout, Figma 2445-5411)
 *
 * The master "AI features" toggle is ON, so every AI setting is visible and
 * turned on. Structure mirrors the redesigned AI tab:
 *   AI features (master)
 *   AI Bot group:  AVA            — parent → inner page (5 features)
 *   Phone group:   Closed captioning — parent → inner page (2 features)
 *                  AI voicemail summaries
 *   Chat group:    AI writer for messaging, AI summary, AI translation
 *   SMS group:     AI writer for SMS
 *
 * AVA replaces the old AI Assistant. Parent cards (AVA, Closed captioning) show
 * an "N features" badge + CaretRight chevron instead of a switch — the chevron
 * opens the feature's inner page where its own switch + children live.
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

        {/* AI Bot group — AVA replaces AI Assistant, parent of 5 features */}
        <SectionHeading>AI Bot</SectionHeading>
        <ParentCard
          title="AVA"
          icon={<SpringIcon as={AvaMd} />}
          featureCount={5}
          description="A personal assistant that helps you boost productivity."
        />

        {/* Phone group */}
        <SectionHeading>Phone</SectionHeading>
        <ParentCard
          title="Closed captioning"
          icon={<SpringIcon as={ClosedCaptionsMd} />}
          featureCount={2}
          description="Uses AI to display real-time captions during phone calls."
        />
        <SettingCard
          title="AI voicemail summaries"
          icon={<SpringIcon as={VoicemailMd} />}
          switchOn
          description="Delivers AI-generated summaries of voicemails, including key details and follow-up items."
          summary={ALLOWED}
        />

        {/* Chat group */}
        <SectionHeading>Chat</SectionHeading>
        <SettingCard
          title="AI writer for messaging"
          icon={<SpringIcon as={AiWriterAltMd} />}
          switchOn
          description="Uses AI to draft and refine messages — check grammar, adjust tone or length, and translate to other languages."
          summary={ALLOWED}
        />
        <SettingCard
          title="AI summary"
          icon={<SpringIcon as={AiSummaryMd} />}
          switchOn
          description="Provides AI summaries that highlight key conversation points."
          summary={ALLOWED}
        />
        <SettingCard
          title="AI translation"
          icon={<SpringIcon as={GlobeMd} />}
          switchOn
          description="Uses AI to translate chats, messages, and transcripts across languages."
          summary={ALLOWED}
        />

        {/* SMS group */}
        <SectionHeading>SMS</SectionHeading>
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
