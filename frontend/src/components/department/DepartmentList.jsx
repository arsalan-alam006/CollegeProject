import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component"; // ✅ DEFAULT IMPORT (CORRECT)
import axios from "axios";
import { columns } from "../../utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/departments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.success) {
          const data = res.data.departments.map((dep, index) => ({
            _id: dep._id,
            sno: index + 1,
            dep_name: dep.dep_name,
          }));
          setDepartments(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={departments}
        progressPending={loading}
        pagination
      />
    </div>
  );
};

export default DepartmentList;
