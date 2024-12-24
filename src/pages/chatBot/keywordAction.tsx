import React, { useState } from "react";
import AddKeywordActionForm from "../../components/form/addKeywordAction-form"; // Form Component
import Table from "../../components/ui/table"; // Reusable Table Component
import ReplyActionPage from "./replyActionPage";
interface KeywordAction {
  id: number;
  keyword: string;
  triggered: number;
  matchingMethod: string;
  replyMaterial: string;
}

const KeywordAction: React.FC = () => {
  const [showForm, setShowForm] = useState(false); // Toggles between form and table
  const [currentStep, setCurrentStep] = useState(1);
  const [keywordActions, setKeywordActions] = useState<KeywordAction[]>([
    {
      id: 1,
      keyword: "help",
      triggered: 0,
      matchingMethod: "Fuzzy matching (80%)",
      replyMaterial: "Text: Test keyword",
    },
    {
      id: 2,
      keyword: "unsubscribe",
      triggered: 2,
      matchingMethod: "Exact matching",
      replyMaterial: "Text: Unsubscribe confirmation",
    },
  ]);

  return (
    <div className="p-6 bg-gray-50 w-full">
      {!showForm || currentStep==3 ? (
        <>
          {/* Table View */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-800">
              Keyword Action List
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Add keyword action
            </button>
          </div>

          <Table<KeywordAction>
            columns={[
              "Keyword",
              "Triggered",
              "Matching method",
              "Reply material",
              "Actions",
            ]}
            data={keywordActions}
            totalRows={keywordActions.length}
            rowsPerPage={5}
            currentPage={1}
            onPageChange={() => {}} // Replace with your pagination logic
            onRowsPerPageChange={() => {}} // Replace with your rows-per-page logic
            renderRow={(row) => (
              <tr key={row.id} className="border-t">
                <td className="p-4">{row.keyword}</td>
                <td className="p-4">{row.triggered}</td>
                <td className="p-4">{row.matchingMethod}</td>
                <td className="p-4">{row.replyMaterial}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-blue-500">
                      Edit
                    </button>
                    <button className="text-gray-500 hover:text-red-500">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )}
          />
        </>
      ) : (
        //<AddKeywordActionForm onBack={() => setShowForm(false)} />
        <div className="p-6 bg-gray-50 min-h-screen">
          {currentStep === 1 && (
            <AddKeywordActionForm
              onBack={() => setShowForm(false)}
              onNextStep={() => setCurrentStep(2)} // Navigate to step 2
            />
          )}
          {currentStep === 2 && (
            <ReplyActionPage
              onSave={() => setCurrentStep(3)} // Navigate to table
              onBack={() => setCurrentStep(1)} // Back to step 1
            />
          )}
        </div>
      )}
    </div>
  );
};

export default KeywordAction;
