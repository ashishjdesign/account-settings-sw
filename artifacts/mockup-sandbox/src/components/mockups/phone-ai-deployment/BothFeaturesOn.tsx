import React from 'react';
import { PhoneAiDeployment } from './_shared';

export function BothFeaturesOn({ onBack }: { onBack?: () => void }) {
  return <PhoneAiDeployment onBack={onBack} initialCallNotes transcriptDeployment={{ defaultValue: 'On', access: 'Allowed' }} notesDeployment={{ defaultValue: 'Off', access: 'Allowed' }} />;
}