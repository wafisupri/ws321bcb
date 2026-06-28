import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

interface NoteBoxProps {
  children: ReactNode;
  variant?: 'info' | 'warning';
}

export default function NoteBox({ children, variant = 'info' }: NoteBoxProps) {
  return (
    <div
      className="flex gap-3 items-start p-4 rounded-r-md mt-6"
      style={{
        backgroundColor: 'rgba(200, 150, 46, 0.08)',
        borderLeft: '3px solid #C8962E',
      }}
    >
      {variant === 'warning' && (
        <AlertTriangle className="flex-shrink-0 mt-0.5" size={16} style={{ color: '#C8962E' }} />
      )}
      <p className="text-sm italic" style={{ color: '#374151' }}>
        {children}
      </p>
    </div>
  );
}
