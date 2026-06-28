interface RACIRow {
  activity: string;
  roles: Record<string, string>;
}

interface RACITableProps {
  columns: string[];
  rows: RACIRow[];
}

const roleStyle: Record<string, { bg: string; text: string }> = {
  'R / A': { bg: '#C8962E', text: '#fff' },
  R: { bg: '#1A2B4C', text: '#fff' },
  A: { bg: '#C8962E', text: '#fff' },
  C: { bg: '#6B7280', text: '#fff' },
  I: { bg: 'transparent', text: '#374151' },
};

export default function RACITable({ columns, rows }: RACITableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
        <thead>
          <tr style={{ backgroundColor: '#1A2B4C' }}>
            <th className="text-left text-white font-semibold text-sm px-5 py-3.5 min-w-[200px]">
              Activity / Department
            </th>
            {columns.map((col) => (
              <th key={col} className="text-center text-white font-semibold text-sm px-4 py-3.5 min-w-[100px]">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.activity}
              className="transition-colors duration-200 hover:border-l-[3px] hover:border-l-[#C8962E]"
              style={{
                backgroundColor: idx % 2 === 0 ? '#fff' : '#F5F6F8',
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              <td className="px-5 py-3.5 text-sm font-medium" style={{ color: '#1A2B4C' }}>
                {row.activity}
              </td>
              {columns.map((col) => {
                const role = row.roles[col] || '';
                const style = roleStyle[role] || roleStyle.I;
                return (
                  <td key={col} className="text-center px-4 py-3.5">
                    {role && (
                      <span
                        className="inline-block rounded px-2.5 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: style.bg,
                          color: style.text,
                          border: role === 'I' ? '1px solid #E5E7EB' : 'none',
                        }}
                      >
                        {role}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
