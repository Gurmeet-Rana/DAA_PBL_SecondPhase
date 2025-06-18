export default function OptionButton({ label, onClick }) {
  return (
    <button
      className="bg-gray-200 hover:bg-gray-300 p-3 rounded text-left text-sm font-medium"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
