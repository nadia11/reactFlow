import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import Modal from "../ui/modal"; // Import your custom modal component
import { Icons } from "@/assets/Icons";
const AddKeywordActionForm: React.FC<{
  onBack: () => void;
  onNextStep: () => void;
}> = ({ onBack, onNextStep }) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [matchingMethod, setMatchingMethod] =
    useState<string>("Fuzzy matching");
  const [fuzzyMatchPercentage, setFuzzyMatchPercentage] = useState<number>(80);

  // Add new keyword
  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
      setIsModalOpen(false);
    }
  };

  // Delete keyword
  const handleDeleteKeyword = (keyword: string) => {
    setKeywords(keywords.filter((kw) => kw !== keyword));
  };

  const handleSliderChange = (value: number[]) => {
    setFuzzyMatchPercentage(value[0]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-gray-600 hover:text-green-500 flex items-center mb-6 gap-2"
      >
        <Icons.arrowLeft /> <span>Back</span>
      </button>

      {/* Step Indicator */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center">
          <div className="h-10 w-10 flex items-center justify-center bg-green-500 text-white rounded-full">
            1
          </div>
          <span className="ml-2 text-gray-700">Trigger Keyword</span>
        </div>
        <div className="flex-1 border-t-2 border-dotted border-green-500"></div>
        <div className="flex items-center">
          <div className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-full">
            2
          </div>
          <span className="ml-2 text-gray-500">Reply Action</span>
        </div>
      </div>

      {/* Keywords Section */}
      <div className="bg-white p-6 rounded-md shadow mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Keyword(s):</h2>
        <div className="flex items-center gap-4 flex-wrap">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-md space-x-2"
            >
              <span>{keyword}</span>
              <button
                onClick={() => handleDeleteKeyword(keyword)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-dashed border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-50"
          >
            Add Keyword +
          </button>
        </div>
      </div>

      {/* Matching Methods Section */}
      <div className="bg-white p-6 rounded-md shadow mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Message matching methods:
        </h2>
        <div className="flex items-center gap-4">
          {["Fuzzy matching", "Exact matching", "Contains"].map((method) => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="radio"
                name="matchingMethod"
                value={method}
                checked={matchingMethod === method}
                onChange={() => setMatchingMethod(method)}
                className="form-radio text-green-500"
              />
              <span className="text-gray-700">{method}</span>
            </label>
          ))}
        </div>

        {/* Fuzzy Matching Slider */}
        {matchingMethod === "Fuzzy matching" && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>0%</span>
              <span>{fuzzyMatchPercentage}%</span>
              <span>100%</span>
            </div>
            <Slider.Root
              className="relative flex items-center w-full h-4"
              value={[fuzzyMatchPercentage]}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
            >
              <Slider.Track className="relative h-2 bg-gray-200 rounded-full flex-1">
                <Slider.Range className="absolute h-full bg-green-500 rounded-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-4 h-4 bg-green-500 rounded-full shadow"
                aria-label="Fuzzy match percentage"
              />
            </Slider.Root>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
          onClick={onNextStep}
        >
          Next step
        </button>
        <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition">
          Save changes
        </button>
      </div>

      {/* Add Keyword Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold text-gray-700 mb-4">Add Keyword</h2>
        <input
          type="text"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="Enter keyword"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex items-center space-x-4">
          <button
            onClick={handleAddKeyword}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Add
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddKeywordActionForm;
