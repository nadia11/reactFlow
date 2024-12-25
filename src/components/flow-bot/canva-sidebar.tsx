import { cn } from "@/lib/utils";
import { useNodeStore } from "@/store/node-data";
import { Icons } from "../../assets/Icons";
import {
  sidebarNavigation,
  sidebarNavigationAlternatives,
} from "@/configs/sideNavOptions";
import { DragEvent, useState } from "react";
import { BaseNodeData } from "@/types";
import { camelCase } from "lodash";
import clsx from "clsx";

export const Canvasidebar = () => {
  const { state, dispatch } = useNodeStore();
  const [showQuestionOptions, setShowQuestionOptions] = useState(false);
  const handleToggleDrawer = () => {
    setShowQuestionOptions(false);
    dispatch({ type: "SET_SIDEBAR_OPEN", payload: !state.sidebarOpen });
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>, data: BaseNodeData) => {
    e.dataTransfer.setData(`application/reactflow/label`, data.label);
    e.dataTransfer.setData(`application/reactflow/type`, camelCase(data.label));
    e.dataTransfer.setData(`application/reactflow/icon`, camelCase(data.icon));
    e.dataTransfer.setData(
      `application/reactflow/description`,
      camelCase(data.description)
    );
  };

  return (
  //   <div
  //   className={cn(
  //     "bg-[#eef0f7] border rounded-md transition-all duration-300 h-screen flex flex-col pb-6 z-30 overflow-y-auto",
  //     state.sidebarOpen ? "w-[20%] opacity-100" : "w-0 hidden"
  //   )}
  // >
  //   <div className="flex justify-between items-center px-4 py-4 border-b-2 w-full">
  //     {showQuestionOptions && (
  //       <button
  //         onClick={() => setShowQuestionOptions(false)}
  //         className="flex flex-row items-center text-gray-600 font-bold"
  //       >
  //         <Icons.arrowLeft className="mr-2" />
  //         Ask a Question
  //       </button>
  //     )}
  //     <button onClick={handleToggleDrawer}>
  //       <Icons.close className="text-gray-600" />
  //     </button>
  //   </div>
  
  //   <div className="flex flex-col px-4 my-4 gap-6">
  //     {(showQuestionOptions
  //       ? sidebarNavigationAlternatives
  //       : sidebarNavigation
  //     ).map((section, sectionIndex) => (
  //       <div key={sectionIndex} className="w-full">
  //         <h3 className="text-lg text-gray-600 font-bold mb-2">
  //           {section.label}
  //         </h3>
  //         <div className={`grid ${section.className} gap-4`}>
  //           {section.children.map((item, itemIndex) => {
  //             const Icon = Icons[item.icon ?? "chevronLeft"];
  //             return (
  //               <div
  //                 key={itemIndex}
  //                 className={clsx(
  //                   "p-4 flex flex-col items-center justify-center rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-grab shadow-md",
  //                   item.bgColor
  //                 )}
  //                 draggable
  //                 onDragStart={(event) =>
  //                   onDragStart(event, {
  //                     label: item.label,
  //                     icon: item.icon as any,
  //                   })
  //                 }
  //                 onClick={() => {
  //                   if (item.title === "Ask a question") {
  //                     setShowQuestionOptions(true); // Update state when "Ask a question" is clicked
  //                   }
  //                 }}
  //               >
  //                 <div className="flex flex-col items-center">
  //                   <div
  //                     className={clsx(
  //                       "p-3 rounded-full bg-white",
  //                       item.logoColor
  //                     )}
  //                   >
  //                     <Icon className="w-6 h-6" />
  //                   </div>
  //                   <h6
  //                     className={`${item.textColor} text-sm font-bold mt-2 text-center`}
  //                   >
  //                     {item.title}
  //                   </h6>
  //                 </div>
  //                 <p
  //                   className={`${item.textColor} text-xs text-center mt-1 leading-tight`}
  //                 >
  //                   {item.description}
  //                 </p>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // </div>
  <div className="flex flex-col gap-2 px-1 my-5 z-30 bg-slate-100">
  <div className="flex flex-col gap-4 items-start justify-start h-[80vh] overflow-y-auto">
    {(showQuestionOptions ? sidebarNavigationAlternatives : sidebarNavigation).map(
      (item, index) => (
        <div key={index} className="w-full px-3">
          <h3 className="text-lg text-gray-600 font-bold">{item.label}</h3>
          <div className={`grid ${item.className} w-full`}>
            {item.children.map((child, childIndex) => {
              const Icon = Icons[child.icon ?? "chevronLeft"];
              return (
                <div
                  key={childIndex}
                  className={clsx(
                    "mt-1 px-3 py-5 my-2 flex flex-col items-end justify-center rounded-2xl hover:bg-gray-400 w-full hover:shadow-md transition-all duration-300 cursor-grab",
                    child.type !== "icon" ? child.bgColor : ""
                  )}
                  draggable
                  onDragStart={(event) =>
                    onDragStart(event, {
                      label: child.label,
                      icon: child.icon as any,
                    })
                  }
                  onClick={() => {
                    if (child.title === "Ask a question") {
                      setShowQuestionOptions(true); // Update state when "Ask a question" is clicked
                    }
                  }}
                >
                  <div
                    className={clsx(
                      "flex justify-between items-start w-full", // Common classes
                      child.type === "icon"
                        ? "flex-col items-center justify-center px-1 gap-0"
                        : "flex-row" // Conditional layout
                    )}
                  >
                    {/* Icon without background */}
                    <div
  className={`${child.bgColor} w-12 h-12 mb-2 rounded-xl flex items-center justify-center`}
>
  {child.type === "icon" && (
    <Icon
      className="text-white w-5 h-5" // Only the icon color
      strokeWidth={9}
    />
  )}
    {child.type !== "icon" && (
    <Icon
      className="text-white w-7 h-7" // Only the icon color
      strokeWidth={9}
    />
  )}
</div>

                    {/* Title */}
                    <div className="flex flex-col">
                      <h6
                        className={`${
                          child.type === "icon" ? "text-slate-500" : child.textColor
                        } text-sm font-bold`}
                      >
                        {child.title}
                      </h6>
                    </div>
                  </div>

                  {/* Description */}
                  {child.type !== "icon" && (
                    <h6 className={`${child.textColor} text-sm`}>
                      {child.description}
                    </h6>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )
    )}
  </div>
</div>

  );
};
