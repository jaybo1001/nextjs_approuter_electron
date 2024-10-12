import Knowledge from "./RightControlsTabs/Knowledge/Knowledge";
import GlowCardRightTabContentArea from "./RightPanelTable/GlowCardRightTabContentArea";

const RightPanelTabContent = () => {
  return (
    <div className="flex h-full w-full">
      <GlowCardRightTabContentArea
        id="1"
        name="Knowledge"
        description="Knowledge"
        usage="Knowledge"
      >
        <Knowledge />
      </GlowCardRightTabContentArea>
    </div>
  );
};

export default RightPanelTabContent;
