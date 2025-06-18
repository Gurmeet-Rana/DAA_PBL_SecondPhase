import Sidebar from "./components/Sidebar";
import MainSection from "./components/MainSection";
import { useState } from "react";

export default function App() {
  const [selectedOption, setSelectedOption] = useState("Welcome");

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar onOptionSelect={setSelectedOption} />
      <MainSection selectedOption={selectedOption} />
    </div>
  );
}
