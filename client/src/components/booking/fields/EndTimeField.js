
import React, { useState, useEffect } from "react";
import { setHours, setMinutes, format } from "date-fns";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const EndTimeField = ({ label, time, setTime }) => {
  const [selectedTime, setSelectedTime] = useState(time || "-");

  useEffect(() => {
    setTime(selectedTime);
  }, [selectedTime, setTime]);

  const generateTimeOptions = () => {
    const options = [];
    let currentTime = setHours(setMinutes(new Date(), 0), 8);
    const endTime = setHours(setMinutes(new Date(), 0), 20);

    while (currentTime <= endTime) {
      options.push({
        display: format(currentTime, "h:mm aa"),
        value: format(currentTime, "HH:mm"),
      });
      currentTime = setMinutes(currentTime, currentTime.getMinutes() + 15);
    }

    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleTimeChange = (time, close) => {
    setSelectedTime(time.display);
    setTime(time.value);
    close();
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedTime || "-"}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-gray-400"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-full max-h-60 overflow-y-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            {timeOptions.map((timeOption) => (
              <MenuItem key={timeOption.value}>
                {({ active, close }) => (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleTimeChange(timeOption, close);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {timeOption.display}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default EndTimeField;
