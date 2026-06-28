import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

interface NoteBoxProps {
  children: ReactNode;
  variant?: 'info' | 'warning';
}

export default function NoteBox({ children, variant = 'info' }: NoteBoxProps) {
  const isWarning = variant === 'warning';
  return (
    <div
      className="flex gap-3 items-start p-4 rounded-r-md mt-6"
      style={{
        backgroundColor: isWarning ? 'rgba(251,176,52,0.08)' : 'rgba(122,193,67,0.08)',
        borderLeft: `3px solid ${isWarning ? '#FBB034' : '#7AC143'}`,
      }}
    >
      {isWarning && (
        <AlertTriangle className="flex-shrink-0 mt-0.5" size={16} style={{ color: '#FBB034' }} />
      )}
      <p className="text-sm italic" style={{ color: '#000000' }}>
        {children}
      </p>
    </div>
  );
}
