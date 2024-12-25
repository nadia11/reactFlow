import React from 'react';
import {  LucideMenu, LucideBell, LucideUsers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Menu from '../ui/menu';
interface HeaderProps {
    onMenuClick: () => void;
  }
  
  const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const menuItems = [
      { label: 'Default Action', route: '/defaultActions' },
      { label: 'Keyword Action', route: '/keywordActions' },
      { label: 'Reply Material', route: '/replyActions' },
      { label: 'Rules', route: '/menu4' },
      { label: 'WhatsApp Flows', route: '/menu5' },
    ];
    
    const navigate = useNavigate();
    return (
      <header className="w-full bg-white h-16 shadow-md flex items-center px-4 justify-between border-b border-slate-200">
        {/* Hamburger Menu */}
        <div
          onClick={onMenuClick}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <LucideMenu size={20} />
        </div>
  
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-lg font-semibold text-green-600" onClick={()=>navigate("/")}>
            <span className="bg-green-500 h-8 w-8 rounded-full flex justify-center items-center text-white">
              T
            </span>
            <span className="ml-2">Techzilo</span>
          </button>
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <a href="" className="text-gray-600 hover:text-gray-900" onClick={()=>navigate("/teamInbox")}>
              Team Inbox
            </a>
            <a href="" className="text-gray-600 hover:text-gray-900" onClick={()=>navigate("/broadcast")}>
              Broadcast
            </a>
            <a href="" className="text-gray-600 hover:text-gray-900" onClick={()=>navigate("/contacts")}>
              Contacts
            </a>
            <div>
        {/* Automations Dropdown */}
        <Menu title="Automations" items={menuItems} />
      </div>

            <button className="text-gray-600 hover:text-gray-900" onClick={()=>{navigate("/myBots")}}>
              Chatbots
            </button>
          </nav>
        </div>
  
        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={()=>navigate("login")}>
            <LucideUsers size={20} className="text-gray-600" />
          </button>
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <LucideBell size={20} className="text-gray-600" />
          </button>
        </div>
      </header>
    );
  };
  
  export default Header;

