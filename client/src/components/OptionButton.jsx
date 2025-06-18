export default function OptionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#2a2a3b] hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
    >
      {label}
    </button>
  );
}
