import React from 'react';
import { LucideMessageCircle, LucideUsers, LucideBell, LucidePieChart, LucideSettings, LucideInbox, LucideGroup, LucideAward } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed z-50 h-full bg-white w-64 shadow-lg">
      {/* Logo */}
      <div className="p-6 bg-teal-500 text-white font-bold text-lg flex items-center space-x-3">
        <LucideSettings size={24} />
        <span>Techzilo</span>
      </div>

      {/* Navigation Items */}
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <a href="#dashboard" className="flex items-center space-x-3 text-gray-700 hover:text-teal-500">
              <LucideAward size={20} />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#message-templates" className="flex items-center space-x-3 text-gray-700 hover:text-teal-500">
              <LucideMessageCircle size={20} />
              <span>Message Templates</span>
            </a>
          </li>
          <li>
            <a href="#contacts" className="flex items-center space-x-3 text-gray-700 hover:text-teal-500">
              <LucideUsers size={20} />
              <span>Contacts</span>
            </a>
          </li>
          <li>
            <a href="#notifications" className="flex items-center space-x-3 text-gray-700 hover:text-teal-500">
              <LucideBell size={20} />
              <span>Notifications</span>
            </a>
          </li>
          <li>
            <a href="#analytics" className="flex items-center space-x-3 text-gray-700 hover:text-teal-500">
              <LucidePieChart size={20} />
              <span>Analytics</span>
            </a>
          </li>
          <li>
            <a href="#automations" className="flex items-center space-x-3 text-gray-700 hover:text-teal-500">
              <LucideSettings size={20} />
              <span>Automations</span>
            </a>
          </li>
          <li>
            <a href="#inbox" className="flex items-center space-x-3 text-gray-700 hover:text-teal-500">
              <LucideInbox size={20} />
              <span>Inbox</span>
            </a>
          </li>
          <li>
            <a href="#group" className="flex items-center space-x-3 text-gray-700 hover:text-teal-500">
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
