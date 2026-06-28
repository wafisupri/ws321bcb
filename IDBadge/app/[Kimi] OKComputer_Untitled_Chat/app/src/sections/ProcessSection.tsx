import { useState, useRef, useEffect } from 'react';
import ProcessSteps from '@/components/ProcessSteps';
import RACITable from '@/components/RACITable';
import DownloadCard from '@/components/DownloadCard';
import NoteBox from '@/components/NoteBox';
import InfoCard from '@/components/InfoCard';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'onboarding', label: 'On-Boarding' },
  { id: 'offboarding', label: 'Off-Boarding' },
  { id: 'raci', label: 'RACI Summary' },
  { id: 'documents', label: 'Documents' },
];

const ONBOARDING_STEPS = [
  {
    number: 1,
    title: 'HR Notification',
    description:
      'HR Department notifies Security Team of new employee\'s start date and details at least 3 business days in advance.',
  },
  {
    number: 2,
    title: 'Document Verification',
    description:
      'Employee submits required documents: copy of national ID, passport-size photograph, and signed access card application form.',
  },
  {
    number: 3,
    title: 'Photo Capture',
    description:
      'Security Team captures employee photograph at the Security Office, SPARK Centre, Ground Floor.',
  },
  {
    number: 4,
    title: 'Card Production',
    description:
      'OSS Section processes the access card with employee photo, full name, SAP/BFI number, and department designation.',
  },
  {
    number: 5,
    title: 'HSSE Briefing',
    description:
      'HSSE Department conducts safety orientation and briefs the employee on facility access rules and PPE requirements.',
  },
  {
    number: 6,
    title: 'Card Handover',
    description:
      'Security Team activates the card and hands it over to the employee. Employee signs the card receipt register.',
  },
];

const OFFBOARDING_STEPS = [
  {
    number: 1,
    title: 'HR Notification',
    description:
      'HR Department notifies Security Team, OSS Section, and HSSE Department of employee\'s last working day at least 5 business days in advance.',
  },
  {
    number: 2,
    title: 'Clearance Check',
    description:
      'Employee completes department clearance from their respective section head, confirming no outstanding items or equipment.',
  },
  {
    number: 3,
    title: 'Card Return',
    description:
      'Employee returns the physical access card to the Security Office at the SPARK Centre. Security verifies card condition and scans it into the return log.',
  },
  {
    number: 4,
    title: 'Deactivation',
    description:
      'OSS Section deactivates the card in the access control system within 24 hours of return. HSSE updates the employee safety records.',
  },
  {
    number: 5,
    title: 'Final Confirmation',
    description:
      'Security Team issues a clearance certificate confirming card return and system deactivation. HR includes this in the final exit documentation.',
  },
];

const RACI_COLUMNS = ['Security Team', 'OSS Section', 'HSSE Department', 'HR Department', 'Employee'];

const RACI_ROWS = [
  {
    activity: 'Card Application',
    roles: {
      'Security Team': 'C',
      'OSS Section': 'C',
      'HSSE Department': 'I',
      'HR Department': 'R / A',
      Employee: 'R',
    },
  },
  {
    activity: 'Card Production',
    roles: {
      'Security Team': 'I',
      'OSS Section': 'R / A',
      'HSSE Department': 'I',
      'HR Department': 'C',
      Employee: 'I',
    },
  },
  {
    activity: 'Safety Briefing',
    roles: {
      'Security Team': 'C',
      'OSS Section': 'I',
      'HSSE Department': 'R / A',
      'HR Department': 'I',
      Employee: 'R',
    },
  },
  {
    activity: 'Card Activation',
    roles: {
      'Security Team': 'R / A',
      'OSS Section': 'C',
      'HSSE Department': 'C',
      'HR Department': 'I',
      Employee: 'I',
    },
  },
  {
    activity: 'Card Return & Deactivation',
    roles: {
      'Security Team': 'R / A',
      'OSS Section': 'R',
      'HSSE Department': 'C',
      'HR Department': 'A',
      Employee: 'R',
    },
  },
];

const DOWNLOADS = [
  {
    name: 'BFI Access Card Application Form',
    description: 'Complete form for new employee access card requests. Includes photo consent and data privacy agreement.',
    format: 'PDF',
  },
  {
    name: 'BRE Access Card Application Form',
    description: 'Application form for business partners and contractors requiring facility access.',
    format: 'PDF',
  },
  {
    name: 'Access Card Return Form',
    description: 'Form to be completed when returning an access card upon off-boarding. Includes condition assessment.',
    format: 'PDF',
  },
  {
    name: 'Lost Card Report Form',
    description: 'Incident report form for lost or stolen access cards. Must be filed within 24 hours.',
    format: 'PDF',
  },
  {
    name: 'RACI Matrix \u2014 Access Card Process',
    description: 'Complete Responsibility Assignment Matrix covering all activities and stakeholders.',
    format: 'PDF',
  },
  {
    name: 'On-Boarding Checklist',
    description: 'Department-wise checklist for new employee on-boarding including access card milestones.',
    format: 'PDF',
  },
  {
    name: 'Off-Boarding Checklist',
    description: 'Department-wise checklist for employee exit process including card return verification.',
    format: 'PDF',
  },
];

const KEY_POINTS = [
  'All new employees must complete the access card application as part of their on-boarding checklist',
  'The Security Team, OSS Section, and HSSE Department are jointly responsible for card issuance and management',
  'Access cards must be returned upon termination, resignation, or contract completion',
  'Lost or damaged cards must be reported to Security immediately for deactivation and replacement',
  'Business partner (BRE) cards follow a separate but parallel process managed by the same departments',
];

export default function ProcessSection() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSwitching, setIsSwitching] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const switchTab = (tabId: string) => {
    if (tabId === activeTab) return;
    setIsSwitching(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsSwitching(false);
    }, 150);
  };

  // Update indicator position
  useEffect(() => {
    const tabs = tabsRef.current;
    const indicator = indicatorRef.current;
    if (!tabs || !indicator) return;

    const activeBtn = tabs.querySelector(`[data-tab="${activeTab}"]`) as HTMLElement;
    if (activeBtn) {
      indicator.style.left = `${activeBtn.offsetLeft}px`;
      indicator.style.width = `${activeBtn.offsetWidth}px`;
    }
  }, [activeTab]);

  return (
    <section
      id="process-overview"
      className="w-full py-16 md:py-20"
      style={{ backgroundColor: '#F4F4F4' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p
            className="section-entrance text-xs font-medium uppercase tracking-[0.05em] mb-3"
            style={{ color: '#FBB034' }}
          >
            EMPLOYEE LIFECYCLE MANAGEMENT
          </p>
          <h2
            className="section-entrance section-entrance-delay-1 font-semibold text-[clamp(1.5rem,3vw,2rem)] leading-tight mb-3"
            style={{ color: '#005847' }}
          >
            Access Card Process
          </h2>
          <p
            className="section-entrance section-entrance-delay-2 text-base mx-auto"
            style={{ color: '#6D6E71', maxWidth: '640px' }}
          >
            Comprehensive procedures for employee on-boarding and off-boarding across all BFI
            departments.
          </p>
        </div>

        {/* Tab Bar */}
        <div
          ref={tabsRef}
          className="section-entrance section-entrance-delay-3 relative flex overflow-x-auto mb-0"
          style={{ borderBottom: '1px solid #d1d1d1' }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => switchTab(tab.id)}
              className="relative flex-shrink-0 px-6 md:px-8 py-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
              style={{
                color: activeTab === tab.id ? '#005847' : '#6D6E71',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) (e.target as HTMLElement).style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) (e.target as HTMLElement).style.color = '#6D6E71';
              }}
            >
              {tab.label}
            </button>
          ))}
          {/* Sliding indicator */}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-[3px] transition-all duration-300 ease-out"
            style={{ backgroundColor: '#FBB034' }}
          />
        </div>

        {/* Tab Content Area */}
        <div
          ref={contentRef}
          className="bg-white rounded-xl p-6 md:p-10 min-h-[500px] mt-6"
          style={{
            opacity: isSwitching ? 0 : 1,
            transform: isSwitching ? 'translateY(10px)' : 'translateY(0)',
            transition: 'opacity 300ms ease-out, transform 300ms ease-out',
          }}
        >
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
              <div>
                <h3 className="font-semibold text-xl mb-5" style={{ color: '#005847' }}>
                  Process at a Glance
                </h3>
                <p className="text-base leading-relaxed mb-5" style={{ color: '#000000' }}>
                  The BFI Access Card is issued to all employees and business partners of Brunei
                  Fertilizer Industries. The card serves as an identification document and access
                  credential for the Sungai Liang Industrial Park facility. Both on-boarding and
                  off-boarding processes involve coordinated efforts across multiple departments to
                  ensure security, compliance, and operational continuity.
                </p>
                <p className="text-base font-medium mb-3" style={{ color: '#000000' }}>
                  Key aspects of the process:
                </p>
                <ul className="space-y-3">
                  {KEY_POINTS.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                        style={{ backgroundColor: '#7AC143' }}
                      />
                      <span className="text-base leading-relaxed" style={{ color: '#000000' }}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <InfoCard />
              </div>
            </div>
          )}

          {/* Tab 2: On-Boarding */}
          {activeTab === 'onboarding' && (
            <div>
              <h3 className="font-semibold text-xl mb-2" style={{ color: '#005847' }}>
                Employee On-Boarding Process
              </h3>
              <p className="text-sm mb-8" style={{ color: '#6D6E71' }}>
                Step-by-step procedure for issuing the BFI Access Card to new employees and business
                partners.
              </p>
              <ProcessSteps steps={ONBOARDING_STEPS} />
              <NoteBox>
                Business partners (BRE) follow the same process but are issued a BRE Access Card with
                &apos;BUSINESS PARTNER&apos; designation instead of &apos;BFI EMPLOYEE&apos;.
              </NoteBox>
            </div>
          )}

          {/* Tab 3: Off-Boarding */}
          {activeTab === 'offboarding' && (
            <div>
              <h3 className="font-semibold text-xl mb-2" style={{ color: '#005847' }}>
                Employee Off-Boarding Process
              </h3>
              <p className="text-sm mb-8" style={{ color: '#6D6E71' }}>
                Procedure for access card return and account deactivation when an employee leaves
                BFI.
              </p>
              <ProcessSteps steps={OFFBOARDING_STEPS} />
              <NoteBox variant="warning">
                Important: Failure to return the access card may result in a replacement fee and will
                be flagged in the employee&apos;s exit clearance. Lost cards must be reported before
                the last working day.
              </NoteBox>
            </div>
          )}

          {/* Tab 4: RACI Summary */}
          {activeTab === 'raci' && (
            <div>
              <h3 className="font-semibold text-xl mb-2" style={{ color: '#005847' }}>
                Responsibility Overview
              </h3>
              <p className="text-sm mb-8" style={{ color: '#6D6E71' }}>
                A summary of key responsibilities across departments for the access card lifecycle.
                For the complete RACI matrix, see the full document download below.
              </p>
              <RACITable columns={RACI_COLUMNS} rows={RACI_ROWS} />
              <p
                className="text-xs font-medium text-center uppercase tracking-[0.05em] mt-4"
                style={{ color: '#6D6E71' }}
              >
                R = Responsible | A = Accountable | C = Consulted | I = Informed
              </p>
              <div className="text-center mt-6">
                <p className="text-sm mb-4" style={{ color: '#000000' }}>
                  Download the complete RACI matrix document for detailed responsibility breakdowns.
                </p>
                <button
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200"
                  style={{
                    border: '1px solid #005847',
                    color: '#005847',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#005847';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#005847';
                  }}
                >
                  Download Full RACI Matrix
                </button>
              </div>
            </div>
          )}

          {/* Tab 5: Documents */}
          {activeTab === 'documents' && (
            <div>
              <h3 className="font-semibold text-xl mb-2" style={{ color: '#005847' }}>
                Downloadable Forms &amp; Documents
              </h3>
              <p className="text-sm mb-8" style={{ color: '#6D6E71' }}>
                All forms and documents related to the BFI Access Card process. Click to download.
              </p>
              <div className="flex flex-col gap-4">
                {DOWNLOADS.map((doc) => (
                  <DownloadCard
                    key={doc.name}
                    name={doc.name}
                    description={doc.description}
                    format={doc.format}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
