interface Step {
  number: number;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="relative">
      {/* Timeline connector line */}
      <div
        className="absolute left-5 top-8 bottom-8 w-0.5 hidden md:block"
        style={{ backgroundColor: '#E5E7EB' }}
      />
      <div className="flex flex-col">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex gap-5 py-5 border-b last:border-b-0"
            style={{ borderColor: '#E5E7EB' }}
          >
            {/* Step number circle */}
            <div className="relative z-10 flex-shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base"
                style={{ backgroundColor: '#1A2B4C' }}
              >
                {step.number}
              </div>
            </div>
            {/* Step content */}
            <div className="flex-1 pt-1.5">
              <h4 className="font-semibold text-base mb-1.5" style={{ color: '#1A2B4C' }}>
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
