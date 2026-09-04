import React from 'react';
import { PhoneAiDeployment } from './_shared';

export function LiveTranscriptsOnly({ onBack }: { onBack?: () => void }) {
  return <PhoneAiDeployment onBack={onBack} initialCallNotes={false} transcriptDeployment={{ defaultValue: 'On', access: 'Allowed' }} notesDeployment={{ defaultValue: 'Off', access: 'Allowed' }} />;
}