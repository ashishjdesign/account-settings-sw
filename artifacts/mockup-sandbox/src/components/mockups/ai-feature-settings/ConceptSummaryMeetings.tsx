import { Video, Disc, DoorOpen, Hash } from 'lucide-react';
import { FeatureSettingsLayout, SectionHeading, SettingCard } from './_chrome';

export function ConceptSummaryMeetings() {
  return (
    <FeatureSettingsLayout selectedTab="Meetings">
      <SettingCard
        title="Video meetings"
        switchOn
        icon={<Video className="h-5 w-5" strokeWidth={1.6} />}
        description="Let users schedule and host video meetings with up to 200 participants."
        summary={[
          { label: 'User default:', value: 'On' },
          { value: 'Users can change this setting' },
        ]}
        onManage={() => {}}
      />

      <SettingCard
        title="Personal meeting ID"
        switchOn
        icon={<Hash className="h-5 w-5" strokeWidth={1.6} />}
        description="Give each user a permanent meeting room they can share with anyone."
        summary={[
          { value: 'Available for all users' },
        ]}
        onManage={() => {}}
      />

      <SectionHeading>Security</SectionHeading>

      <SettingCard
        title="Waiting room"
        switchOn
        icon={<DoorOpen className="h-5 w-5" strokeWidth={1.6} />}
        description="Place participants in a virtual waiting room until the host admits them."
        summary={[
          { label: 'Applies to:', value: 'External participants' },
        ]}
        onManage={() => {}}
      />

      <SettingCard
        title="Cloud recording"
        switchOn={false}
        icon={<Disc className="h-5 w-5" strokeWidth={1.6} />}
        description="Save meeting recordings, transcripts, and chat to the cloud for 30 days."
      />
    </FeatureSettingsLayout>
  );
}
