import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmpList = () => {
  const [empdata, setEmpData] = useState(null);
  const navigate = useNavigate();

  const loadDetails = (id) => {
    navigate(`/employee/details/${id}`);
  };

  const removeFunction = (id) => {
    if (window.confirm('Do you want to remove this account?')) {
      axios.delete(`http://localhost:8001/employee/${id}`)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          alert("Removed successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.error("Error:", err.message);
        });
    }
  };

  const loadEdit = (id) => {
    navigate(`/employee/edit/${id}`);
  };

  useEffect(() => {
    axios.get("   http://localhost:8001/employee")
      .then((res) => {
        setEmpData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="card bg-dark text-white">
        <div className="card-title">
          <h2>List of Employees</h2>
        </div>
        <div className="card-body">
          <div className="divbtn mb-3">
            <Link to="employee/create" class="addnewbtn" className="btn btn-success">
              Add New (+)
            </Link>
          </div>

          <table className="table table-bordered text-center">
          <thead className="bg-dark text-white">
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Action</th>
  </tr>
</thead>

            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td className="text-center">
                      <button
                        onClick={() => loadEdit(item.id)}
                        className="btn btn-success btn-sm mx-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeFunction(item.id)}
                        className="btn btn-danger btn-sm mx-1"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => loadDetails(item.id)}
                        className="btn btn-primary btn-sm mx-1"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpList;
