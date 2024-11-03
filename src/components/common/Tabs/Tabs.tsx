import React, { useState } from "react";
// import { TabsDataEntity } from '@Entities/TabsData.entity';
import styles from "./Tabs.module.css";

export interface TabsProps {
  TabsData: any[];
}

const Tabs: React.FC<TabsProps> = ({ TabsData }) => {
  const [activeTab, setActiveTab] = useState<string>(TabsData[0]?.label);

  const changeTab = (tabTitle: string) => {
    setActiveTab(tabTitle);
  };

  return (
    <div className=" w-full p-5 bg-transparent rounded-xl ">
      <div className=" flex justify-between">
        <div className="flex gap-8">
          {TabsData &&
            TabsData?.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <button
                    key={index}
                    className={
                      item?.label === activeTab
                        ? `${styles.active}  border-b-2 border-orange-500 !font-Arimo !font-bold !text-base`
                        : "text-[#8B8B8B] !font-Arimo !font-normal !text-base"
                    }
                    onClick={() => changeTab(item?.label)}
                  >
                    <span
                      className={
                        item?.label === activeTab
                          ? `${styles.gradientText}`
                          : ""
                      }
                    >
                      {item?.label}
                    </span>
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      <div className="mt-4  p-2 rounded-xl">
        {TabsData &&
          TabsData?.map((item: any, index: number) => {
            return (
              <div key={index}>
                {item?.label === activeTab ? item?.content : null}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Tabs;
