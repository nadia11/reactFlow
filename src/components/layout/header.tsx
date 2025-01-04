import React, {useState} from 'react';
import {  LucideMenu, LucideBell, LucideUsers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Menu from '../ui/menu';
import Modal from '../ui/modal';
import { LogOut, Settings, Copy, Info, Bell, Smartphone, HelpCircle, Mail } from 'lucide-react';
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
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
      <>
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
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={()=>setLoginModalOpen(true)}>
            <LucideUsers size={20} className="text-gray-600" />
          </button>
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <LucideBell size={20} className="text-gray-600" />
          </button>
        </div>
      </header>
      <Modal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} position='right'>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">aron imaginations</h2>
            <p className="text-sm text-gray-500">arontechs@gmail.com</p>
            <p className="text-sm text-gray-500">Client ID: 363221</p>
          </div>
          <button
            onClick={() => setLoginModalOpen(false)}
            className="text-gray-700 hover:text-gray-900"
          >
            <LogOut size={20} onClick={()=>{navigate("/login")}}/>
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mb-4">
          <button className="flex items-center justify-between w-full bg-gray-100 p-2 rounded hover:bg-gray-200">
            <Settings size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">Settings</span>
          </button>
          <button className="flex items-center justify-between w-full bg-gray-100 p-2 rounded hover:bg-gray-200">
            <Copy size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">Copy click-to-chat link</span>
          </button>
          <button className="flex items-center justify-between w-full bg-gray-100 p-2 rounded hover:bg-gray-200">
            <Info size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">Change Info</span>
          </button>
          <button className="flex items-center justify-between w-full bg-gray-100 p-2 rounded hover:bg-gray-200">
            <Bell size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">Manage Notifications</span>
          </button>
        </div>

        {/* Channel Status */}
        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-4">
          Channel Status
        </button>

        <button className="w-full bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300">
          Add WhatsApp Chat Button to your Website
        </button>

        {/* Language and Support Options */}
        <div className="mt-4">
          <label className="block text-sm text-gray-500 mb-1">Language</label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option value="default">Default</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="flex items-center justify-center bg-gray-100 p-2 rounded hover:bg-gray-200">
            <HelpCircle size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">Help center</span>
          </button>
          <button className="flex items-center justify-center bg-gray-100 p-2 rounded hover:bg-gray-200">
            <HelpCircle size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">Keyboard shortcuts</span>
          </button>
          <button className="flex items-center justify-center bg-gray-100 p-2 rounded hover:bg-gray-200">
            <HelpCircle size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">Join our community</span>
          </button>
          <button className="flex items-center justify-center bg-gray-100 p-2 rounded hover:bg-gray-200">
            <HelpCircle size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">What's new</span>
          </button>
          <button className="flex items-center justify-center bg-gray-100 p-2 rounded hover:bg-gray-200">
            <HelpCircle size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">Watch tutorials</span>
          </button>
          <button className="flex items-center justify-center bg-gray-100 p-2 rounded hover:bg-gray-200">
            <Mail size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">Email us</span>
          </button>
        </div>

        {/* Mobile OS Options */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="flex items-center justify-center bg-gray-200 p-2 rounded-full hover:bg-gray-300">
            <Smartphone size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">IOS</span>
          </button>
          <button className="flex items-center justify-center bg-gray-200 p-2 rounded-full hover:bg-gray-300">
            <Smartphone size={20} className="text-gray-600" />
            <span className="ml-2 text-gray-800">Android</span>
          </button>
        </div>
      </Modal>
      </>
    );
  };
  
  export default Header;

