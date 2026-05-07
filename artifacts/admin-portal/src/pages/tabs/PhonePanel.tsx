import React from 'react';
import { Phone, PhoneIncoming, Voicemail, Mic } from 'lucide-react';
import { useSettings } from '../../store';
import { SettingCard, SectionHeading } from '../../components/shared';

export default function PhonePanel() {
  const { state, dispatch } = useSettings();
  const { callQueue, callerId, voicemail, autoRecording } = state.phone;

  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        title="Call queue"
        switchOn={callQueue.on}
        icon={<PhoneIncoming className="h-5 w-5" strokeWidth={1.6} />}
        description="Route incoming calls to a group of users so the next available agent picks up."
        summary={[
          { label: 'Overflow:', value: callQueue.overflow },
          { value: `Wait time ${callQueue.waitTimeSec}s` },
        ]}
        onManage={() => {}}
        onSwitchClick={() => dispatch({ type: 'SET_PHONE_CALL_QUEUE', payload: !callQueue.on })}
      />

      <SettingCard
        title="Caller ID"
        switchOn={callerId.on}
        icon={<Phone className="h-5 w-5" strokeWidth={1.6} />}
        description="Choose what number is shown to the people you call from this account."
        summary={[
          { label: 'User default:', value: callerId.defaultVal },
          { value: callerId.allowChange ? 'Users can change this setting' : 'Users cannot change this setting' },
        ]}
        onManage={() => {}}
        onSwitchClick={() => dispatch({ type: 'SET_PHONE_CALLER_ID', payload: !callerId.on })}
      />

      <SectionHeading>Call handling</SectionHeading>

      <SettingCard
        title="Voicemail"
        switchOn={voicemail.on}
        icon={<Voicemail className="h-5 w-5" strokeWidth={1.6} />}
        description="Let callers leave a recorded message when users are unavailable."
        summary={[
          { label: 'Greeting:', value: voicemail.greeting },
          { value: voicemail.emailNotifications ? 'Email notifications on' : 'Email notifications off' },
        ]}
        onManage={() => {}}
        onSwitchClick={() => dispatch({ type: 'SET_PHONE_VOICEMAIL', payload: !voicemail.on })}
      />

      <SettingCard
        title="Automatic call recording"
        switchOn={autoRecording.on}
        icon={<Mic className="h-5 w-5" strokeWidth={1.6} />}
        description="Record inbound and outbound calls automatically for compliance and quality review."
        onSwitchClick={() => dispatch({ type: 'SET_PHONE_AUTO_RECORDING', payload: !autoRecording.on })}
      />
    </div>
  );
}
