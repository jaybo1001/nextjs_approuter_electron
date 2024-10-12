import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slot {
  id: number;
  title: string;
  content: string;
}

const sampleSlots: Slot[] = [
  { id: 1, title: 'Slot 1', content: 'This is the content for Slot 1. It contains multiple lines of text to demonstrate the scrolling behavior when the content exceeds two lines. You should see a scrollbar appear.' },
  { id: 2, title: 'Slot 2', content: 'Slot 2 also has lengthy content. It showcases how the accordion handles longer text while maintaining a consistent two-line height. Scroll to see more!' },
  { id: 3, title: 'Slot 3', content: 'The final slot continues the pattern with extended content. This design allows for compact presentation while still providing access to detailed information through scrolling.' },
];

const Accordion = ({ slots }: { slots: Slot[] }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {slots.map((slot, index) => (
        <motion.div key={slot.id} initial={false}>
          <motion.button
            className="w-full px-4 py-2 text-left bg-[#217CAF] text-white rounded-md hover:bg-[#8e154A] transition-colors"
            onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
          >
            {slot.title}
          </motion.button>
          <AnimatePresence initial={false}>
            {index === expandedIndex && (
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className="px-4 py-2 text-white bg-[#475569] rounded-b-md overflow-hidden">
                  <div className="h-[3em] overflow-y-auto text-sm">
                    {slot.content}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const Card = ({ title, description, slots }: { title: string; description: string; slots: Slot[] }) => {
  return (
    <div className="w-full max-w-md md:max-w-2xl bg-black rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-[#ECA902] font-semibold">{title}</div>
        <p className="mt-2 text-white">{description}</p>
        <div className="mt-4">
          <Accordion slots={slots} />
        </div>
      </div>
    </div>
  );
};

const FlexContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-4xl max-h-[80vh] border border-[#217CAF] border-opacity-20 rounded-xl p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default function NStepCard1() {
  return (
    <FlexContainer>
      <Card
        title="Interactive Card"
        description="Explore this card with Framer Motion accordion slots. Each slot's content area is two lines tall with scrollable overflow."
        slots={sampleSlots}
      />
    </FlexContainer>
  );
}