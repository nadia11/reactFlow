import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import ToggleSwitch from "@/components/ui/toggleSwitch";
import { Icons } from "@/assets/Icons";
import { myBotsData } from "@/MocData/myBots";
import Pagination from "@/components/ui/pagination";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import toast from "react-hot-toast";
interface Time {
  from: string;
  to: string;
}

interface Day {
  closed: boolean;
  times: Time[];
}

type WorkingHours = Day[];
const DefaultActions: React.FC = () => {
  const [isWorkingHoursModalOpen, setWorkingHoursModalOpen] = useState(false);
  const [holidayMode, setHolidayMode] = useState(false);
  const [workingHours, setWorkingHours] = useState<WorkingHours>(
    Array(7).fill({
      closed: true,
      times: [{ from: "09:00", to: "17:00" }],
    })
  );

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [search, setSearch] = useState("");
  const [isClockOpen, setIsClockOpen] = useState(false);
  const filteredData = myBotsData.filter((bot) =>
    bot.name.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleToggleDay = (index: number) => {
    setWorkingHours((prev) =>
      prev.map((day, i) =>
        i === index ? { ...day, closed: !day.closed } : day
      )
    );
  };

  const handleTimeChange = (
    index: number,
    timeIndex: number,
    field: keyof Time,
    value: string
  ) => {
    setWorkingHours((prev) =>
      prev.map((day, i) =>
        i === index
          ? {
              ...day,
              times: day.times.map((time, tIndex) =>
                tIndex === timeIndex ? { ...time, [field]: value } : time
              ),
            }
          : day
      )
    );
  };
  
  const handleAddTimer = (index: number) => {
    setWorkingHours((prev) =>
      prev.map((day, i) =>
        i === index
          ? {
              ...day,
              times: [...day.times, { from: "09:00", to: "17:00" }],
            }
          : day
      )
    );
  };

  const handleDeleteTimer = (dayIndex: number, timeIndex: number) => {
    setWorkingHours((prev) =>
      prev.map((day, i) =>
        i === dayIndex
          ? {
              ...day,
              times: day.times.filter((_, tIndex) => tIndex !== timeIndex),
            }
          : day
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 w-full">
      <h1 className="text-2xl font-semibold mb-4">Default Actions</h1>
      <p className="mb-6 text-gray-700">
        Set your working hours and default actions for chatbot behavior.
      </p>

      {/* Working Hours Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="font-bold">Current Working Hours:</div>
        <button
          onClick={() => setWorkingHoursModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Set Working Hours
        </button>
      </div>

      {/* Table Section */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search Your Bots..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full max-w-md"
          />
        </div>
        <table className="w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Triggered</th>
              <th className="p-4 text-left">Steps Finished</th>
              <th className="p-4 text-left">Finished</th>
              <th className="p-4 text-left">Modified On</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((bot) => (
              <tr key={bot.id} className="border-t">
                <td className="p-4">{bot.name}</td>
                <td className="p-4">{bot.triggered}</td>
                <td className="p-4">{bot.stepsFinished}</td>
                <td className="p-4">{bot.finished}</td>
                <td className="p-4">{bot.modifiedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalRows={filteredData.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>

      {/* Modal */}
      <Modal
        open={isWorkingHoursModalOpen}
        onClose={() => setWorkingHoursModalOpen(false)}
      >
        <h2 className="text-lg font-bold mb-4">Working Hours Setting</h2>
        <p className="mb-4 text-sm text-gray-500">
          Changes apply to all connected channels (WhatsApp & Instagram)
        </p>

        {/* Holiday Mode */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold">Holiday Mode</span>
          <ToggleSwitch
            isChecked={holidayMode}
            onToggle={() => setHolidayMode(!holidayMode)}
          />
        </div>

        {/* Working Hours */}
        <div className="max-h-[60vh] overflow-y-auto">
          {workingHours.map((day, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ToggleSwitch
                    isChecked={!day.closed}
                    onToggle={() => handleToggleDay(index)}
                  />
                  <span className="font-semibold">
                    {daysOfWeek[index]} {!day.closed ? "Open" : "Closed"}
                  </span>
                </div>
                {!day.closed && (
                  <button
                    onClick={() => handleAddTimer(index)}
                    className="text-green-500 hover:text-green-600"
                  >
                    <Icons.plus className="w-5 h-5" />
                  </button>
                )}
              </div>

              {!day.closed && (
                <div className="mt-4 space-y-4">
                  {day.times.map((time, timeIndex) => (
                    <div
                      key={timeIndex}
                      className="flex items-center justify-center bg-slate-100  p-2 rounded space-x-5"
                    >
                      <TimePicker
                        onChange={(value) =>
                          handleTimeChange(
                            index,
                            timeIndex,
                            "from",
                            value || ""
                          )
                        }
                        value={time.from}
                        onClockClose={() => setIsClockOpen(false)}
                        onClockOpen={() => setIsClockOpen(true)}
                        autoFocus={true}
                        className="w-50"
                      />
                      <span>to</span>
                      <TimePicker
                        onChange={(value) =>
                          handleTimeChange(index, timeIndex, "to", value || "")
                        }
                        onClockClose={() => setIsClockOpen(false)}
                        onClockOpen={() => setIsClockOpen(true)}
                        value={time.to}
                        className="w-50"
                      />
                      <button
                        onClick={() => handleDeleteTimer(index, timeIndex)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Icons.trash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => {setWorkingHoursModalOpen(false); toast.success("Working hour saved successfully")}}
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
        >
          Save and Close
        </button>
      </Modal>
    </div>
  );
};

export default DefaultActions;
