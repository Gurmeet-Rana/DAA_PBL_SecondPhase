import OptionButton from "./OptionButton";

export default function Sidebar({ onOptionSelect }) {
  const options = [
    "View Graph",
    "Reschedule Platforms",
    "Propagate Delays",
    "Show Train Schedules",
    "Reset System",
  ];

  return (
    <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">Train Menu</h2>
      <div className="flex flex-col gap-2">
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
