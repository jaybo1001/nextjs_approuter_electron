import React, { useState, useEffect } from 'react';
import { useColors } from '@/contexts/ColorContext';
import GlowCard from '@/GlowUI/GlowCard';
import GlowToggleActionButton from '@/GlowUI/GlowToggleActionButton';

const NestedGlowCardsExample: React.FC = () => {
  const { colorSets, activeColorSet } = useColors();
  const [demoButtonState, setDemoButtonState] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);
  const [actionCount, setActionCount] = useState(0);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    if (demoButtonState === 'loading') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setDemoButtonState('active');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [demoButtonState]);

  const handleDemoButtonClick = () => {
    if (demoButtonState === 'normal') {
      setDemoButtonState('loading');
    } else if (demoButtonState === 'active') {
      setDemoButtonState('normal');
    }
  };

  const handleActionButtonClick = () => {
    if (isActionLoading) return;

    setIsActionLoading(true);
    setTimeout(() => {
      setActionCount(prevCount => prevCount + 1);
      setIsActionLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full mb-8 px-[3%] sm:px-[5%] md:px-[7%] lg:px-[10%] xl:px-[15%]">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="w-full md:w-1/2">
          <GlowCard
            id="nested-example-1"
            name="Nested Example 1"
            colorSet={colorSets[activeColorSet]}
          >
            <h3 className="text-lg font-semibold mb-2">Nest Level 1</h3>
            <p className="text-sm mb-0">This is the outermost card with the default background transparency.</p>
            <GlowCard
              id="nested-example-2"
              name="Nested Example 2"
              colorSet={colorSets[activeColorSet]}
              colorNestLevel="L2"
            >
              <h4 className="text-md font-semibold mb-2">Nest Level 2</h4>
              <p className="text-sm mb-4">This card has a slightly adjusted background transparency.</p>
              <GlowToggleActionButton
                id="nested-toggle-button"
                mode="toggle"
                name="Nested Toggle"
                colorSet={colorSets[activeColorSet]}
                className="mb-4"
                tooltipText="Click to toggle"
              >
                Toggle Me
              </GlowToggleActionButton>
              <GlowCard
                id="nested-example-3"
                name="Nested Example 3"
                colorSet={colorSets[activeColorSet]}
                colorNestLevel="L3"
              >
                <h5 className="text-sm font-semibold mb-2">Nest Level 3</h5>
                <p className="text-xs mb-4">The background transparency continues to adjust as we nest deeper.</p>
                <GlowCard
                  id="nested-example-4"
                  name="Nested Example 4"
                  colorSet={colorSets[activeColorSet]}
                  colorNestLevel="L4"
                >
                  <h6 className="text-xs font-semibold mb-2">Nest Level 4</h6>
                  <p className="text-xs mb-4">Notice how the background becomes more or less transparent.</p>
                  <GlowCard
                    id="nested-example-5"
                    name="Nested Example 5"
                    colorSet={colorSets[activeColorSet]}
                    colorNestLevel="L5"
                  >
                    <p className="text-xs font-semibold mb-2">Nest Level 5</p>
                    <p className="text-xs">This is the deepest nested card, showing the maximum transparency adjustment.</p>
                  </GlowCard>
                </GlowCard>
              </GlowCard>
            </GlowCard>
          </GlowCard>
        </div>
        
        <div className="w-full md:w-1/2">
          <GlowCard
            id="glow-toggle-button-showcase"
            name="GlowToggleButton Showcase"
            colorSet={colorSets[activeColorSet]}
            colorNestLevel="L1"
            innerPadding={10}
          >
            <h3 className="text-lg font-semibold mb-4">GlowToggleButton Showcase</h3>
            <p className="text-sm mb-4">This card demonstrates the GlowToggleButton in various states, now featuring animated tooltips.</p>
            
            <GlowCard
              id="demo-state-transition"
              name="Toggle Mode:Demo State Transition"
              colorSet={colorSets[activeColorSet]}
              colorNestLevel="L2"
              innerPadding={10}
              marginBottom={10}
            >
              <h4 className="text-md font-semibold mb-2">Demo State Transition</h4>
              <p className="text-sm mb-2">Click the button to see it transition through states:</p>
              <GlowToggleActionButton
                id="demo-toggle"
                mode="toggle"
                name="Demo Toggle"
                colorSet={colorSets[activeColorSet]}
                isLoading={isLoading}
                initialState={demoButtonState === 'active'}
                onToggleOn={handleDemoButtonClick}
                onToggleOff={handleDemoButtonClick}
                tooltipText={
                  demoButtonState === 'normal' ? "Click to activate" :
                  demoButtonState === 'loading' ? "Processing..." :
                  "Click to deactivate"
                }
              >
                {demoButtonState === 'normal' ? "Activate" :
                 demoButtonState === 'loading' ? "Loading..." :
                 "Deactivate"}
              </GlowToggleActionButton>
            </GlowCard>

            <GlowCard
              id="action-mode-demo"
              name="Action Mode Demo"
              colorSet={colorSets[activeColorSet]}
              colorNestLevel="L2"
              innerPadding={10}
              marginBottom={10}
            >
              <h4 className="text-md font-semibold mb-2">Action Mode</h4>
              <p className="text-sm mb-2">Click the button to increment the counter (with 1-second loading):</p>
              <div className="flex items-center gap-4">
                <GlowToggleActionButton
                  id="action-button"
                  mode="action"
                  name="Action Button"
                  colorSet={colorSets[activeColorSet]}
                  onAction={handleActionButtonClick}
                  isLoading={isActionLoading}
                  tooltipText={isActionLoading ? "Processing..." : "Click to increment"}
                  loadingText="Loading..."
                >
                  {isActionLoading ? "Loading..." : "Increment"}
                </GlowToggleActionButton>
                <span className="text-lg font-semibold">Count: {actionCount}</span>
              </div>
            </GlowCard>

            <GlowCard
              id="normal-state"
              name="Normal State"
              colorSet={colorSets[activeColorSet]}
              colorNestLevel="L2"
              innerPadding={10}
              marginBottom={10}
            >
              <h4 className="text-md font-semibold mb-2">Normal State</h4>
              <p className="text-sm mb-2">Default appearance of the button with tooltip:</p>
              <GlowToggleActionButton
                id="normal-toggle"
                mode="toggle"
                name="Normal Toggle"
                colorSet={colorSets[activeColorSet]}
                tooltipText="Click to toggle"
              >
                Normal Toggle
              </GlowToggleActionButton>
            </GlowCard>

            <GlowCard
              id="active-state"
              name="Active State"
              colorSet={colorSets[activeColorSet]}
              colorNestLevel="L2"
              innerPadding={10}
              marginBottom={10}
            >
              <h4 className="text-md font-semibold mb-2">Active State</h4>
              <p className="text-sm mb-2">Button in its active (toggled on) state with detailed tooltip:</p>
              <GlowToggleActionButton
                id="active-toggle"
                mode="toggle"
                name="Active Toggle"
                colorSet={colorSets[activeColorSet]}
                initialState={true}
                tooltipText="Currently active"
                additionalTooltipText="Click to deactivate"
              >
                Active Toggle
              </GlowToggleActionButton>
            </GlowCard>

            <GlowCard
              id="loading-state"
              name="Loading State"
              colorSet={colorSets[activeColorSet]}
              colorNestLevel="L2"
              innerPadding={10}
              marginBottom={10}
            >
              <h4 className="text-md font-semibold mb-2">Loading State</h4>
              <p className="text-sm mb-2">Button in loading state with informative tooltip:</p>
              <GlowToggleActionButton
                id="loading-toggle"
                mode="toggle"
                name="Loading Toggle"
                colorSet={colorSets[activeColorSet]}
                isLoading={true}
                tooltipText="Processing request"
              >
                Loading Toggle
              </GlowToggleActionButton>
            </GlowCard>

            <GlowCard
              id="disabled-state"
              name="Disabled State"
              colorSet={colorSets[activeColorSet]}
              colorNestLevel="L2"
              innerPadding={10}
            >
              <h4 className="text-md font-semibold mb-2">Disabled State</h4>
              <p className="text-sm mb-2">Button in disabled state with explanatory tooltip:</p>
              <GlowToggleActionButton
                id="disabled-toggle"
                mode="toggle"
                name="Disabled Toggle"
                colorSet={colorSets[activeColorSet]}
                isDisabled={true}
                tooltipText="Action unavailable"
                additionalTooltipText="Please check your permissions"
              >
                Disabled Toggle
              </GlowToggleActionButton>
            </GlowCard>
          </GlowCard>
        </div>
      </div>
    </div>
  );
};

export default NestedGlowCardsExample;