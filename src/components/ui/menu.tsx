import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LucideChevronDown } from 'lucide-react';

interface MenuItem {
  label: string;
  route: string; // Use `route` instead of `href` for navigation
}

interface MenuProps {
  title: string;
  items: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuItemClick = (route: string) => {
    navigate(route); // Navigate to the route
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center text-green-600 font-semibold"
      >
        {title}
        <LucideChevronDown size={18} className="ml-1" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-1">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleMenuItemClick(item.route)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
