import { useEffect, useRef, useState } from "react";
import { TabData } from "../types";
import { getActiveTab, setActiveTab } from "../utils";

interface TabsProps {
  tabsData: TabData[];
}

export default function Tabs({ tabsData }: TabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(getActiveTab());
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    setActiveTab(activeTabIndex);
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  return (
    <div className="mt-3">
      <div className="relative">
        <div className="flex space-x-3 border-b border-backgroundPrimaryDark">
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                ref={(el) => el && (tabsRef.current[idx] = el)}
                className="pt-2 pb-3 flex-1 text-sm"
                onClick={() => setActiveTabIndex(idx)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <span
          className="absolute bottom-0 block h-1 bg-foregroundPrimary transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div className="mt-2 py-4">{tabsData[activeTabIndex].content}</div>
    </div>
  );
}
