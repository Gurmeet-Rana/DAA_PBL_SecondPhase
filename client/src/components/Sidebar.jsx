import OptionButton from "./OptionButton";

export default function Sidebar({ onOptionSelect }) {
  const options = [
    "Reschedule Platforms",
    "Propagate Delays",
    "Show Train Schedules",
    "Reset System",
  ];

  return (
    <div className="w-64 bg-[#1e1e2f] text-white shadow-xl p-6 flex flex-col border border-gray-700">
      <h2 className="text-2xl font-semibold mt-20 mb-6 text-center text-green-300">
        Train Menu
      </h2>
      <div className="flex flex-col gap-8">
        {options.map((label, index) => (
          <OptionButton
            key={index}
            label={label}
            onClick={() => onOptionSelect(label)}
          />
        ))}
      </div>
    </div>
  );
}
