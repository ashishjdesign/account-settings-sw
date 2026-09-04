import React from 'react';
import { PhoneAiDeployment } from './_shared';

export function EditableSharedBehavior({ onBack }: { onBack?: () => void }) {
  return <PhoneAiDeployment onBack={onBack} initialCallNotes transcriptDeployment={{ defaultValue: 'On', access: 'Allowed' }} notesDeployment={{ defaultValue: 'On', access: 'Allowed' }} />;
}