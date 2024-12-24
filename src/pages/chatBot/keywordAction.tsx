import React, { useState } from "react";
import Table from "../../components/ui/table";
import { AddKeywordActionForm } from "@/components/form/addKeywordAction-form";
interface KeywordAction {
  id: number;
  keyword: string;
  triggered: number;
  matchingMethod: string;
  replyMaterial: string;
}

const KeywordAction: React.FC = () => {
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
      triggered: 5,
      matchingMethod: "Exact match",
      replyMaterial: "Text: Unsubscribe confirmation",
    },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showAddActionForm, setShowAddActionForm] = useState(false);

  const handleAddKeywordAction = () => setShowAddActionForm(true);
  const handleCancel = () => setShowAddActionForm(false);
  const filteredActions = keywordActions.filter((action) =>
    action.keyword.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;

  return (
    <div className="p-6 bg-gray-50 w-full">
    {!showAddActionForm ? (
      <>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            Add Keyword Action List
          </h1>
          <button
            onClick={handleAddKeywordAction}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Add keyword action
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-md max-w-sm"
          />
        </div>

        {/* Table */}
        <Table<KeywordAction>
          columns={[
            "Keyword",
            "Triggered",
            "Matching method",
            "Reply material",
            "Actions",
          ]}
          data={[]} // Pass data
          totalRows={0} // Pass total rows
          rowsPerPage={5}
          currentPage={1}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
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
      <AddKeywordActionForm onCancel={handleCancel} />
    )}
  </div>
  );
};

export default KeywordAction;
