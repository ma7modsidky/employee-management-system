import { useState } from "react";
const GenericAccordion = ({ record, onEdit, onDelete , fields, name}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState({ ...record });
  console.log(fields)

  // Handle input changes when editing
  const handleInputChange = (key, value) => {
    setEditedRecord((prev) => ({ ...prev, [key]: value }));
  };

  // Handle save after editing
  const handleSave = () => {
    onEdit(editedRecord);
    setIsEditing(false);
  };

  return (
//     <div className="collapse bg-base-200">
//   <input type="radio" name="my-accordion-1" defaultChecked />
//   <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
//   <div className="collapse-content">
//     <p>hello</p>
//   </div>
// </div>
    <div className="p-6 bg-base-100 rounded-lg shadow-md collapse">
        <input type="radio" name="my-accordion-1"  />
      {isEditing ?
      <h1 className="text-2xl font-bold mb-6 collapse-title">{name} Edit</h1>:
      <h1 className="text-2xl font-bold mb-6 collapse-title">{name} Details</h1> }

      {/* Display record details */}
      <div className="space-y-4 collapse-content">
        {Object.keys(record).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-semibold text-base-content/70" >
              {fields[key].label}
            </label>
            {isEditing && fields[key].editable ? (
              <input
                type="text"
                value={editedRecord[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="input input-bordered w-full text-white"
              />
            ) : (
              <p className="text-lg text-white">{record[key]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-8">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="btn btn-primary"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-ghost"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary p-4"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="btn btn-error p-4"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GenericAccordion;