import { useState } from "react";
import { Link } from "react-router-dom";
const GenericDetail = ({ record, onEdit, onDelete , fields, name}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState({ ...record });

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
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      {isEditing ?
      <h1 className="text-2xl font-bold mb-6">{name} Edit</h1>:
      <h1 className="text-2xl font-bold mb-6">{name} Details</h1> }

      {/* Display record details */}
      <div className="gap-2 ">
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
              <p className="text-lg text-white">{key === 'company' || key ==='department' ? record[key][`${key}_name`] : 
              record[key]}</p>
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
            <Link
            to="edit"
              // onClick={() => setIsEditing(true)}
              className="btn btn-primary p-4"
              
            >
              Edit
            </Link>
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

export default GenericDetail;