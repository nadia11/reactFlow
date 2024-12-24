import React from "react";
import {
    FileText,
    File,
    Image,
    Video,
    Sticker,
    Bot,
    List,
    User,
    LayoutTemplate,
    Bell,
    UserPlus,
    Users,
    Package,
  } from "lucide-react";
  
export const ReplyActionSidebar: React.FC = () => {
    const sidebarItems = [
        { name: "Text", icon: FileText, isActive: true },
        { name: "Document", icon: File, isActive: false },
        { name: "Image", icon: Image, isActive: false },
        { name: "Video", icon: Video, isActive: false },
        { name: "Stickers", icon: Sticker, isActive: false },
        { name: "Chatbots", icon: Bot, isActive: false },
        { name: "Sequences", icon: List, isActive: false, locked: true },
        { name: "Contact Attributes", icon: User, isActive: false },
        { name: "Templates", icon: LayoutTemplate, isActive: false },
        { name: "Send Notification", icon: Bell, isActive: false },
        { name: "Assign to User", icon: UserPlus, isActive: false },
        { name: "Assign to Team", icon: Users, isActive: false },
        { name: "Catalog", icon: Package, isActive: false },
      ];
  return (
    <div className="bg-gray-50 p-4 w-full rounded-md shadow">
      <ul className="space-y-2">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${
              item.isActive
                ? "bg-green-100 text-green-500 font-semibold"
                : "text-gray-700 hover:bg-gray-100 hover:text-green-500"
            } ${item.locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {/* Render the icon */}
            <item.icon size={18} />
            {/* Render the item name */}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

