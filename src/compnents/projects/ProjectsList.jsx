import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import history from "../../history";
import { connect } from "react-redux";
import { getProjects, deleteProject } from "../../actions/projectsActions";
import { Table, Button, Badge } from "reactstrap";
import { FaTrash } from "react-icons/fa";
import TableCard from "../layout/TableCard";
import CardSearch from "../layout/CardSearch";
import CardPagination from "../layout/CardPagination";
import Spinner from "../layout/Spinner";
import PaginationRe from '../pagination/Pag'

// icon
import { ReactComponent as AttachmentIcon } from "../../Icons/attachment.svg";

function ProjectsList({ projects, getProjects, deleteProject }) {
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getProjects();
      setLoading(false);
    };
    getData();
  }, [getProjects]);
  useEffect(() => {
      setAllProjects(projects)
  },[projects]);
  const onSearchResult = (e) =>{
    console.log(e.target.value)
    const result = projects.filter(project=>(project.project_name.toLowerCase().includes(e.target.value.toLowerCase())))
    setAllProjects(result)
  }

  const redirectToProjectDetails = id => history.push(`/projects/${id}`);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const pagesCount = Math.ceil(projects.length / pageSize);
  const currentPosts= projects.slice(currentPage * pageSize,(currentPage + 1) * pageSize);
  const handleClick=(e, index) =>{
    e.preventDefault();
    setCurrentPage(index);    
  }

  return (
    <div>
      <h3>Projects</h3>
      <TableCard>
        <div className="d-flex">
          <CardSearch 
            onSearchResult={onSearchResult}
          />
          <Button tag={Link} to="/projects/new" className="table-card-button">
            New Project
          </Button>
        </div>
        <Table borderless hover className="table_card_table">
          <thead>
            <tr>
              <th>name</th>
              <th>client</th>
              <th>owner</th>
              <th className="text-center">status</th>
              <th>due date</th>
              <th>attachments</th>
              <th></th>
            </tr>
          </thead>

          {!loading ? (
            <tbody>
              {currentPosts.map(
                ({
                  id,
                  project_name = "google mini home",
                  client_name = "google",
                  owner_name = "Boaz Zemer",
                  attachment,
                  asanaData: { name, owner, due_date, current_status, color }
                }) => (
                  <tr key={id}>
                    <td
                      style={{
                        cursor: "pointer"
                      }}
                      onClick={() => redirectToProjectDetails(id)}
                    >
                      {name}
                    </td>
                    <td>{client_name}</td>
                    <td>{owner.name}</td>
                    <td className="text-center">
                      <Badge
                        color="primary"
                        style={{
                          backgroundColor:
                            current_status && current_status.color === "green"
                              ? "#4AD991"
                              : current_status.color === "red"
                              ? "#FF6565"
                              : current_status.color,
                          color: "#4d4f5c"
                        }}
                        pill
                        className="table-card-badge "
                      >
                        {(current_status && current_status.text) || "-"}
                      </Badge>
                    </td>
                    <td>{due_date || "-"}</td>
                    <td>
                      <a
                        href={attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        disabled={!attachment}
                        style={{
                          color: `${attachment ? "#A3A6B4" : "#E9E9F0"}`,
                          fontSize: "1.5em"
                        }}
                      >
                        <AttachmentIcon />
                      </a>
                    </td>
                    <td>
                      <FaTrash
                        className="text-danger"
                        style={{
                          cursor: "pointer",
                          fontSize: "1.2em"
                        }}
                        onClick={() => deleteProject(id)}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          ) : null}
        </Table>
        {loading ? <Spinner /> : null}
        <div className="d-flex justify-content-end">
            <PaginationRe
                  pagesCount={pagesCount}
                  currentPage={currentPage}
                  handleClick={handleClick}
              
                  />
        </div>
      </TableCard>
    </div>
  );
}

const mapStateToProps = state => ({
  projects: state.projects.projects
});
export default connect(
  mapStateToProps,
  {
    getProjects,
    deleteProject
  }
)(ProjectsList);
