import React from 'react';
import { LucideX, LucideLayoutDashboard, LucideMessageCircle, LucideUsers, LucideBell, LucidePieChart, LucideSettings, LucideInbox, LucideGroup } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`fixed z-50 h-full bg-white w-64 shadow-lg transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      {/* Close Button */}
      <div className="flex items-center justify-between p-4 bg-teal-500 text-white">
        <span className="font-bold text-lg">Techzilo</span>
        <button
          onClick={onClose}
          className="p-2 bg-teal-700 rounded-full hover:bg-teal-800"
        >
          <LucideX size={20} />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <a
              href="#dashboard"
              className="flex items-center space-x-3 text-gray-700 hover:text-teal-500"
            >
              <LucideLayoutDashboard size={20} />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#message-templates"
              className="flex items-center space-x-3 text-gray-700 hover:text-teal-500"
            >
              <LucideMessageCircle size={20} />
              <span>Message Templates</span>
            </a>
          </li>
          <li>
            <a
              href="#contacts"
              className="flex items-center space-x-3 text-gray-700 hover:text-teal-500"
            >
              <LucideUsers size={20} />
              <span>Contacts</span>
            </a>
          </li>
          <li>
            <a
              href="#notifications"
              className="flex items-center space-x-3 text-gray-700 hover:text-teal-500"
            >
              <LucideBell size={20} />
              <span>Notifications</span>
            </a>
          </li>
          <li>
            <a
              href="#analytics"
              className="flex items-center space-x-3 text-gray-700 hover:text-teal-500"
            >
              <LucidePieChart size={20} />
              <span>Analytics</span>
            </a>
          </li>
          <li>
            <a
              href="#automations"
              className="flex items-center space-x-3 text-gray-700 hover:text-teal-500"
            >
              <LucideSettings size={20} />
              <span>Automations</span>
            </a>
          </li>
          <li>
            <a
              href="#inbox"
              className="flex items-center space-x-3 text-gray-700 hover:text-teal-500"
            >
              <LucideInbox size={20} />
              <span>Inbox</span>
            </a>
          </li>
          <li>
            <a
              href="#group"
              className="flex items-center space-x-3 text-gray-700 hover:text-teal-500"
            >
              <LucideGroup size={20} />
              <span>Group</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
