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
    <div
      className={cn(
        "bg-[#eef0f7] border rounded-md transition-['width'] duration-300 h-screen flex flex-col pb-6 z-30",
        state.sidebarOpen ? "w-[20%] opacity-100" : "w-0 hidden"
      )}
    >
      <div className="flex justify-between items-center pr-4 py-4 border-b-2 w-full">
        {showQuestionOptions && (
          <button
            onClick={() => {
              setShowQuestionOptions(false);
            }}
            className="flex flex-row"
          >
            <Icons.arrowLeft className="start-7 mr-2" />
            Ask a questions
          </button>
        )}
        <button onClick={handleToggleDrawer}>
          <Icons.close className="start-7" />
        </button>
      </div>

      <div className="flex flex-col gap-2 px-1 my-5">
        <div className="flex flex-col gap-4 items-start justify-start h-[80vh] overflow-y-auto">
          {(showQuestionOptions
            ? sidebarNavigationAlternatives
            : sidebarNavigation
          ).map((item, index) => (
            <div key={index} className="w-full px-3">
              <h3 className="text-lg text-gray-600 font-bold">{item.label}</h3>
              <div className={`grid ${item.className} w-full`}>
                {item.children.map((item, index) => {
                  const Icon = Icons[item.icon ?? "chevronLeft"];
                  return (
                    <div
                      key={index}
                      className={`mt-1 px-3 py-5 my-2 flex flex-col items-end justify-center bg-${item.bgColor}-300 rounded-xl hover:bg-gray-400 w-full hover:shadow-md transition-all duration-300 cursor-grab`}
                      draggable
                      onDragStart={(event) =>
                        onDragStart(event, {
                          label: item.label,
                          icon: item.icon as any,
                        })
                      }
                      onClick={() => {
                        if (item.title === "Ask a question") {
                          setShowQuestionOptions(true); // Update state when "Ask a question" is clicked
                        }
                      }}
                    >
                      <div
                        className={clsx(
                          "flex justify-between items-start w-full", // Common classes
                          item.type === "icon"
                            ? "flex-col border rounded-2xl items-center justify-center bg-slate-300 px-1 py-2"
                            : "flex-row" // Conditional layout
                        )}
                      >
                        <div
                          className={cn("p-2 rounded-full bg-white opacity-25")}
                        >
                          <Icon
                            className={`${item.logoColor}  opacity-100 size-5`}
                            strokeWidth={9}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h6
                            className={`text-${item.bgColor}-500 text-sm font-bold`}
                          >
                            {item.title}
                          </h6>
                        </div>
                      </div>

                      <h6 className={`text-${item.bgColor}-500 text-sm`}>
                        {item.description}
                      </h6>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
