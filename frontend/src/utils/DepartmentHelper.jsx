import React from "react";

export const DepartmentButtons = ({ id }) => {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    cell: (row) => <DepartmentButtons id={row._id} />, // ✅ ONLY place JSX lives
  },
];
