
import React from 'react';
import { ChevronDown } from 'lucide-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import { Icons } from '@/assets/Icons';
import { useState } from 'react';
const DefaultActions: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const items = [
      { value: 'chatbot', label: 'Add Chatbot +' },
      { value: 'sticker', label: 'Add Sticker +' },
    ];
  
    const filteredItems = items.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const actions = [
    { id: 1, label: 'When it is not working hours, reply the following' },
    { id: 2, label: 'When there is no customer service online during working hours, reply the following' },
    { id: 3, label: 'Send the following welcome message when a new chat is started and no keyword search criteria is met' },
    { id: 4, label: 'During working hours, users wait more than ___ minutes without any reply and no keyword matched, reply the following' },
    { id: 5, label: 'Send the following fallback message if no keyword search criteria is met and no default action criteria is met' },
    { id: 6, label: "If customer does not respond and it's not SOLVED, when it almost reaches 24 hours since last message, use the following reply" },
    { id: 7, label: "Expired or Closed chat will not be assigned to Bot but leave the last assignee in case of new message" },
    { id: 8, label: "During out of office, send out of office message always (even if a keyword match is found)" },
    { id: 9, label: "Assign newly opened chats in round-robin manner within users of the assigned team" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto w-full">
      <h1 className="text-2xl font-semibold mb-4">Default Actions</h1>
      <div className="flex items-center gap-4 mb-6">
        {/* <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-purple-600">
          Instagram
        </button> */}
      </div>
      <p className="mb-6 text-gray-700">
        Check when the keyword reply does not match, according to the set working time, use the default reply.
      </p>
      <div className='flex items-start justify-between'>
      <div className='font-bold mr-5'>Current Working Hours: </div>
      <button className="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-gray-400">
        Set Working Hours
      </button>
      </div>
      {/* Two-column layout with vertical divider */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          {actions.slice(0, Math.ceil(actions.length / 2)).map((action, index) => (
            <div
              key={action.id}
              className="flex items-start gap-4 bg-white p-4 rounded shadow"
            >
              <Checkbox.Root
                id={`checkbox-${index}`}
                className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center hover:border-gray-400"
              >
                <Checkbox.Indicator>
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor={`checkbox-${index}`} className="flex-grow text-gray-700">
                {action.label}
              </label>
              <Select.Root>
      <Select.Trigger className="inline-flex items-center justify-between border border-gray-300 rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <Select.Value placeholder="Select material" />
        <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />
      </Select.Trigger>
      <Select.Content className="z-10 bg-white border border-gray-300 rounded shadow w-60">
        {/* Search Bar */}
        <div className="flex items-center border-b border-gray-300 px-3 py-2">
          <span className="w-4 h-4 text-gray-500 mr-2"><Icons.search/></span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow outline-none text-sm text-gray-700"
          />
        </div>
        <Select.Viewport className="p-2">
          {filteredItems.map(item => (
            <Select.Item
              key={item.value}
              value={item.value}
              className="px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              <Select.ItemText>{item.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
            </div>
          ))}
        </div>

        {/* Vertical Divider */}
        <div className="relative space-y-6 border-l border-gray-300 pl-6">
          {actions.slice(Math.ceil(actions.length / 2)).map((action, index) => (
            <div
              key={action.id}
              className="flex items-start gap-4 bg-white p-4 rounded shadow"
            >
              <Checkbox.Root
                id={`checkbox-${index + Math.ceil(actions.length / 2)}`}
                className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center hover:border-gray-400"
              >
                <Checkbox.Indicator>
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label
                htmlFor={`checkbox-${index + Math.ceil(actions.length / 2)}`}
                className="flex-grow text-gray-700"
              >
                {action.label}
              </label>
              <Select.Root>
                <Select.Trigger className="inline-flex items-center justify-between border border-gray-300 rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Select.Value placeholder="Select material" />
                  <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />
                </Select.Trigger>
                <Select.Content className="z-10 bg-white border border-gray-300 rounded shadow">
                  <Select.Viewport className="p-2">
                    <Select.Item
                      value="material1"
                      className="px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      <Select.ItemText>Material 1</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="material2"
                      className="px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      <Select.ItemText>Material 2</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="material3"
                      className="px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      <Select.ItemText>Material 3</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Root>
            </div>
          ))}
        </div>
      </div>

      <button className="mt-8 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Save Settings
      </button>
    </div>
  );
};

export default DefaultActions;
