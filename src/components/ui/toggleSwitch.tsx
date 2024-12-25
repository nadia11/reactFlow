import React from "react";
import * as Switch from "@radix-ui/react-switch";

const ToggleSwitch: React.FC<{
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
}> = ({ isChecked, onToggle }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="flex items-center">
        <Switch.Root
          checked={isChecked}
          onCheckedChange={onToggle}
          className={`w-11 h-6 bg-gray-300 rounded-full relative ${
            isChecked ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <Switch.Thumb
            className={`block w-4 h-4 bg-white rounded-full transition-transform ${
              isChecked ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </Switch.Root>
        <span className="ml-2">{isChecked ? "Enabled" : "Disabled"}</span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
