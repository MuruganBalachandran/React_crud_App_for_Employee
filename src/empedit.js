import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EmpEdit = () => {
  const { empid } = useParams();

  const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [active, activeChange] = useState(true);
  const [validation, valchange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`   http://localhost:8000/employee/${empid}`)
      .then((res) => {
        const resp = res.data;
        idChange(resp.id);
        nameChange(resp.name);
        emailChange(resp.email);
        phoneChange(resp.phone);
        activeChange(resp.isActive);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const empdata = { id, name, email, phone, isActive: active };
    console.log("Data to be sent:", empdata);

    axios
      .put(`   http://localhost:8000/employee/${empid}`, empdata)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        alert("Saved successfully");
        navigate("/emplist");
      })
      .catch((err) => {
        console.error("Error:", err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h1>Employee Edit</h1>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input value={id} disabled="disabled" type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onMouseDown={() => valchange(true)}
                        onChange={(e) => nameChange(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                      {name.length === 0 && validation && <span className="text-danger"> Enter the name</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        required
                        value={email}
                        onMouseDown={() => valchange(true)}
                        onChange={(e) => emailChange(e.target.value)}
                        type="email"
                        className="form-control"
                      />
                      {email.length === 0 && validation && <span className="text-danger"> Enter the email</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        required
                        value={phone}
                        onMouseDown={() => valchange(true)}
                        onChange={(e) => phoneChange(e.target.value)}
                        type="tel"
                        className="form-control"
                      />
                      {phone.length === 0 && validation && <span className="text-danger">Enter the phone</span>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        value={active}
                        onChange={(e) => activeChange(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <span style={{ margin: "0 5px" }}></span> 
                      <Link className="btn btn-danger" to="/">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;
