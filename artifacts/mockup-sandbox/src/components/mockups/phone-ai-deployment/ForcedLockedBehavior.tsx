import React from 'react';
import { PhoneAiDeployment } from './_shared';

export function ForcedLockedBehavior({ onBack }: { onBack?: () => void }) {
  return <PhoneAiDeployment onBack={onBack} initialCallNotes transcriptDeployment={{ defaultValue: 'On', access: 'Restricted' }} notesDeployment={{ defaultValue: 'On', access: 'Allowed' }} />;
}