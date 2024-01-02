import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmpDetails = () => {
  const { empid } = useParams();
  const [empData, setEmpData] = useState({});

  useEffect(() => {
    fetch(`   http://localhost:8000/employee/${empid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setEmpData(data);
      })
      .catch((err) => {
        console.error("Error:", err.message);
      });
  }, [empid]);

  return (
    <div>
      {empData && (
        <div className="card" style={{ textAlign: "left" }}>
          <div className="card-title">
            <h2>Employee Detail</h2>
          </div>
          <div className="card-body">
            <h5>The Employee ID is: {empData.id}</h5>
            <h5>The Employee Name is: {empData.name}</h5>
            <h5>The Employee Email is: {empData.email}</h5>
            <h5>The Employee Phone is: {empData.phone}</h5>
            <Link className="btn btn-danger" to="/">
              Back to listing
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpDetails;
