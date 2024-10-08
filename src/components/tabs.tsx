import { useEffect, useRef, useState } from "react";
import { TabData } from "../types";
import { getActiveTab, setActiveTab } from "../utils";
import classNames from "classnames";

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
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  // Determine the content of the active tab dynamically
  const renderTabContent = () => {
    const currentTab = tabsData[activeTabIndex];
    if (typeof currentTab.content === "function") {
      return currentTab.content();
    }
    return currentTab.content;
  };

  return (
    <div>
      <div className="fixed left-0 -bottom-1 pb-1 bg-backgroundPrimary shadow w-screen">
        <div className="flex">
          {tabsData.map((tab, idx) => (
            <button
              key={idx}
              ref={(el) => el && (tabsRef.current[idx] = el)}
              // className="pt-2 pb-3 flex-1 text-sm"
              className={classNames(
                "pt-2 pb-3 flex-1 text-sm",
                idx === activeTabIndex && "bg-backgroundPrimaryDark",
              )}
              onClick={() => {
                setActiveTabIndex(idx);
                setActiveTab(idx);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span
          className="absolute top-0 block h-0.5 bg-foregroundPrimary transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div className="mt-2 pt-4">{renderTabContent()}</div>
    </div>
  );
}
