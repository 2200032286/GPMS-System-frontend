import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const ViewAllManagerProjects = () => {
  const manager = JSON.parse(sessionStorage.getItem("active-manager"));

  const [allProjects, setAllProjects] = useState([]);

  const [projectName, setProjectName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getAllProject = async () => {
      const allProject = await retrieveAllProject();
      if (allProject) {
        setAllProjects(allProject.projects);
      }
    };

    getAllProject();
  }, []);

  const retrieveAllProject = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/project/fetch/manager?managerId=" + manager.id
    );
    console.log(response.data);
    return response.data;
  };

  const getProjectsByName = async () => {
    const allProject = await retrieveProjectByName();
    if (allProject) {
      setAllProjects(allProject.projects);
    }
  };

  const retrieveProjectByName = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/project/manager/search?projectName=" +
        projectName +
        "&managerId=" +
        manager.id
    );
    console.log(response.data);
    return response.data;
  };

  const searchProjectbyName = (e) => {
    getProjectsByName();
    setProjectName("");
    e.preventDefault();
  };

  const assignToEmployee = (project) => {
    navigate("/project/assign/employee", { state: project });
  };

  const viewProjectStatus = (project) => {
    navigate("/project/status/view", { state: project });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Projects</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="row g-3">
            <div class="col-auto">
              <form class="row g-3">
                <div class="col-auto">
                  <input
                    type="text"
                    class="form-control"
                    id="inputPassword2"
                    placeholder="Enter Project Name..."
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                  />
                </div>
                <div class="col-auto">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text mb-3"
                    onClick={searchProjectbyName}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Project Name</th>
                  <th scope="col">Project Description</th>
                  <th scope="col">Project Requirement</th>
                  <th scope="col">Mentor Assign Status</th>
                  <th scope="col">Mentor Name</th>
                  <th scope="col">Student Assign Status</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Project Created Date</th>
                  <th scope="col">Project Assign Date</th>
                  <th scope="col">Project Deadline</th>
                  <th scope="col">Project Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allProjects.map((project) => {
                  return (
                    <tr>
                      <td>
                        <b>{project.name}</b>
                      </td>

                      <td>
                        <b>{project.description}</b>
                      </td>
                      <td>
                        <b>{project.requirement}</b>
                      </td>
                      <td>
                        <b>{project.assignedToManager}</b>
                      </td>
                      <td>
                        <b>{project.managerName}</b>
                      </td>
                      <td>
                        <b>{project.assignedToEmployee}</b>
                      </td>
                      <td>
                        <b>{project.employeeName}</b>
                      </td>
                      <td>
                        <b>{project.createdDate}</b>
                      </td>
                      <td>
                        <b>{project.assignedDate}</b>
                      </td>
                      <td>
                        <b>{project.deadlineDate}</b>
                      </td>
                      <td>
                        <b>{project.projectStatus}</b>
                      </td>
                      <td>
                        {(() => {
                          if (project.assignedToEmployee === "Not Assigned") {
                            return (
                              <button
                                onClick={() => assignToEmployee(project)}
                                className="btn btn-sm bg-color custom-bg-text"
                              >
                                <b>Assign To Student</b>
                              </button>
                            );
                          } else {
                            return (
                              <button
                                onClick={() => viewProjectStatus(project)}
                                className="btn btn-sm bg-color custom-bg-text mt-2"
                              >
                                <b>View Status</b>
                              </button>
                            );
                          }
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllManagerProjects;
