import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AssignProjectToManager = () => {
  const [assignRequest, setAssignRequest] = useState({
    managerId: "",
    projectId: "",
  });

  const [allManagers, setAllManagers] = useState([]);
  const location = useLocation();
  const project = location.state;

  assignRequest.projectId = project.id;

  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setAssignRequest({
      ...assignRequest,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const getAllManager = async () => {
      const allManager = await retrieveAllManagers();
      if (allManager) {
        setAllManagers(allManager.users);
      }
    };

    getAllManager();
  }, []);

  const retrieveAllManagers = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/manager/all"
    );
    console.log(response.data);
    return response.data;
  };

  const assignProject = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/project/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignRequest),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.success) {
          console.log("Got the success response");

          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/user/admin/project/all");
          }, 1000); // Redirect after 3 seconds
        } else {
          console.log("Didn't got success response");
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1000); // Redirect after 3 seconds
        }
      });
    });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h5 className="card-title">Assign Project To Mentor</h5>
          </div>
          <div className="card-body text-color">
            <div className="mb-3 mt-1">
              <label htmlFor="quantity" className="form-label">
                <b>Project Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={project.name}
                required
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                <b>Project Description</b>
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={project.description}
              />
            </div>

            <div className="mb-3 mt-1">
              <label htmlFor="quantity" className="form-label">
                <b>Project Created Date</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={project.createdDate}
                required
                readOnly
              />
            </div>

            <div className="mb-3 mt-1">
              <label htmlFor="quantity" className="form-label">
                <b>Project Deadline Date</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={project.deadlineDate}
                required
                readOnly
              />
            </div>

            <form>
              <div class="col">
                <label htmlFor="quantity" className="form-label">
                  <b>Assign Project To Mentor</b>
                </label>
                <select
                  name="managerId"
                  onChange={handleUserInput}
                  className="form-control"
                  required
                >
                  <option value="">Select Mentor</option>

                  {allManagers.map((manager) => {
                    return (
                      <option value={manager.id}>
                        {" "}
                        {manager.firstName + " " + manager.lastName}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div class="col">
                <button
                  type="submit"
                  class="btn bg-color btn-sm custom-bg-text mt-4"
                  onClick={assignProject}
                >
                  Update
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignProjectToManager;
