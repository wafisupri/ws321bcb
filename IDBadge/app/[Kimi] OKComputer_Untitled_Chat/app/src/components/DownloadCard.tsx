import { FileText, Download } from 'lucide-react';

interface DownloadCardProps {
  name: string;
  description: string;
  format: string;
}

export default function DownloadCard({ name, description, format }: DownloadCardProps) {
  return (
    <div
      className="flex items-center gap-4 p-5 rounded-lg bg-white transition-all duration-200"
      style={{
        border: '1px solid #d1d1d1',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* File Icon */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: '#005847' }}
      >
        <FileText size={20} className="text-white" />
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate" style={{ color: '#005847' }}>
          {name}
        </p>
        <p className="text-sm truncate" style={{ color: '#6D6E71' }}>
          {description}
        </p>
      </div>

      {/* Format Badge */}
      <span
        className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded"
        style={{
          backgroundColor: 'rgba(251, 176, 52, 0.15)',
          color: '#074C31',
        }}
      >
        {format}
      </span>

      {/* Download Button */}
      <button
        className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-200"
        style={{ backgroundColor: '#FBB034', color: '#074C31' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ffc55a';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(251,176,52,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FBB034';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.97)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Download size={16} />
        <span className="hidden sm:inline">Download</span>
      </button>
    </div>
  );
}
