import React from "react";
import { categories } from "../utils/constant";
import LeftNavItem from "./LeftNavItem";
import useApp from "../context/AppContext";

const LeftNavBar = () => {
  const { selectedcategory, mobilemenu } = useApp();
  return (
    mobilemenu && (
      <div className="hidden flex-col gap-2 bg-red bg-black text-white p-2 min-h-screen  top-12 z-20 sm:flex ">
        {categories?.map((category) => {
          return (
            <LeftNavItem
              name={category?.name}
              icon={category?.icon}
              key={category?.name}
              classname={
                selectedcategory === category?.name
                  ? "bg-white/[0.15] rounded-md"
                  : ""
              }
              divider={category?.divider ? category?.divider : ""}
            />
          );
        })}
      </div>
    )
  );
};

export default LeftNavBar;
