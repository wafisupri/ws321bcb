import { Shield } from 'lucide-react';

interface Department {
  name: string;
  description: string;
}

const departments: Department[] = [
  { name: 'Security Team', description: 'Access control, card issuance, facility entry management' },
  { name: 'OSS Section', description: 'Operational support services, system access coordination' },
  { name: 'HSSE Department', description: 'Health, Safety, Security & Environment compliance oversight' },
];

export default function InfoCard() {
  return (
    <div
      className="bg-white rounded-xl p-8"
      style={{ border: '1px solid #d1d1d1' }}
    >
      <Shield size={48} style={{ color: '#005847' }} className="mb-4" />
      <h3 className="font-semibold text-xl mb-4" style={{ color: '#005847' }}>
        Departments Involved
      </h3>
      <div className="flex flex-col">
        {departments.map((dept, idx) => (
          <div
            key={dept.name}
            className="py-4"
            style={{
              borderBottom: idx < departments.length - 1 ? '1px solid #d1d1d1' : 'none',
            }}
          >
            <p className="font-semibold text-sm mb-1" style={{ color: '#005847' }}>
              {dept.name}
            </p>
            <p className="text-sm" style={{ color: '#6D6E71' }}>
              {dept.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
