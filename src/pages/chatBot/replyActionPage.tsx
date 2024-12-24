import React, { useState } from "react";
import Modal from "../../components/ui/modal"; // Your modal component
import { toast } from "react-hot-toast";
import { Icons } from "@/assets/Icons";
import { ReplyActionSidebar } from "@/components/flow-bot/replyActionSidebar";
interface Material {
  id: number;
  name: string;
  content: string;
}

const ReplyActionPage: React.FC<{ onSave?: () => void; onBack?: () => void }> = ({
  onSave,
  onBack,
}) => {
  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, name: "Test keyword", content: "test keyword" },
  ]);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ name: "", content: "" });

  // Add material from modal
  const handleSaveMaterial = () => {
    const newMat = {
      id: materials.length + 1,
      name: newMaterial.name,
      content: newMaterial.content,
    };
    setMaterials([...materials, newMat]);
    toast.success("Material added successfully!");
    setIsModalOpen(false);
  };

  // Select material
  const handleSelectMaterial = (material: Material) => {
    if (selectedMaterials.some((mat) => mat.id === material.id)) {
      setSelectedMaterials(
        selectedMaterials.filter((mat) => mat.id !== material.id)
      );
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  return (
    <div className="overflow-y-auto w-full">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-gray-600 hover:text-green-500 flex items-center mb-6"
      >
        ← Back
      </button>

      {/* Step Indicator */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center">
          <div className="h-10 w-10 flex items-center justify-center bg-green-500 text-white rounded-full">
            <Icons.checkCircle/>
          </div>
          <span className="ml-2 text-gray-700">Trigger Keyword</span>
        </div>
        <div className="flex-1 border-t-2 border-dotted border-green-500"></div>
        <div className="flex items-center">
          <div className="h-10 w-10 flex items-center justify-center bg-green-500 text-white rounded-full">
            2
          </div>
          <span className="ml-2 text-gray-700">Reply Action</span>
        </div>
      </div>

      {/* Material Selection */}
      <div className="flex flex-col md:flex-row">
        <div className="bg-white p-4 w-full max-w-[20%] rounded-md shadow">
          {/* Material Types */}
          <ReplyActionSidebar/>
        </div>
        <div className="flex-1  p-4 rounded-md shadow ml-4">
          {/* Materials */}
          <div className="flex gap-4 float-right">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
                {/* Action Buttons */}
{(onSave|| onBack) && <span className="flex gap-3">
        <button
          onClick={onBack}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            toast.success("Reply action saved!");
            onSave();
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Save
        </button>
        </span>}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-20">
            {materials.map((material) => (
              <div
                key={material.id}
                className="border p-4 rounded-md shadow flex justify-between"
              >
                <div>
                  <h3 className="font-semibold text-green-600">
                    {material.name}
                  </h3>
                  <p className="text-sm text-gray-500">{material.content}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedMaterials.some(
                    (mat) => mat.id === material.id
                  )}
                  onChange={() => handleSelectMaterial(material)}
                />
              </div>
            ))}
          </div>
                {/* Chips for Selected Materials */}
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedMaterials.map((material) => (
          <div
            key={material.id}
            className="flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-md"
          >
            {material.name}
            <button
              onClick={() =>
                setSelectedMaterials(
                  selectedMaterials.filter((mat) => mat.id !== material.id)
                )
              }
              className="ml-2 text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
        </div>
      </div>



      {/* Add Material Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">New Text Material</h2>
        <div>
          <label className="block text-sm font-medium">Material Name</label>
          <input
            type="text"
            value={newMaterial.name}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, name: e.target.value })
            }
            className="w-full p-2 border rounded mt-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Material Content</label>
          <textarea
            value={newMaterial.content}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, content: e.target.value })
            }
            className="w-full p-2 border rounded mt-2"
          />
        </div>
        <button
          onClick={handleSaveMaterial}
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Save
        </button>
      </Modal>
    </div>
  );
};

export default ReplyActionPage;
