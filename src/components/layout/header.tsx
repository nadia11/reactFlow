import React from 'react';
import {  LucideMail, LucideBell, LucideUsers } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white h-16 shadow-md flex items-center px-4 justify-between">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-lg font-semibold text-green-600">
          <span className="bg-green-500 h-8 w-8 rounded-full flex justify-center items-center text-white">
            Q
          </span>
          <span className="ml-2">Wati</span>
        </div>
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="#team-inbox" className="text-gray-600 hover:text-gray-900">
            Team Inbox
          </a>
          <a href="#broadcast" className="text-gray-600 hover:text-gray-900">
            Broadcast
          </a>
          <a href="#contacts" className="text-gray-600 hover:text-gray-900">
            Contacts
          </a>
          <a href="#automations" className="text-green-600 font-semibold">
            Automations
          </a>
          <a href="#more" className="text-gray-600 hover:text-gray-900">
            More
          </a>
        </nav>
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <LucideUsers size={20} className="text-gray-600" />
        </button>
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <LucideMail size={20} className="text-gray-600" />
        </button>
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <LucideBell size={20} className="text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;
