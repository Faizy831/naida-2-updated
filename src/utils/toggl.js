import TogglClient from "toggl-api";
import axios from "axios";
export const toggl = new TogglClient({
  apiToken: "ab0edeac57fd3b33949ee7d3e8266586"
});
console.log(toggl);
var workplace = null;

export const getProjectDetails = async projectID => {
  const workplace = await getWorkspace();
  const res = await axios.get(
    "https://cors-anywhere.herokuapp.com/https://toggl.com/reports/api/v2/project",
    {
      params: {
        user_agent: "node-toggl-api v1.0.1",
        workspace_id: workplace.id,
        project_id: projectID
      },
      headers: {
        authorization:
          "Basic YWIwZWRlYWM1N2ZkM2IzMzk0OWVlN2QzZTgyNjY1ODY6YXBpX3Rva2Vu"
      }
    }
  );

  return res.data;
};
export const getWorkspace = () =>
  new Promise((resolve, reject) => {
    if (workplace) resolve(workplace);
    toggl.getWorkspaces((err, data) => {
      if (err) console.log(err);
      workplace = data[0];
      resolve(data[0]);
    });
  });

export const createClient = async ({ name }) => {
  const workplace = await getWorkspace();
  return new Promise((resolve, reject) => {
    toggl.createClient({ name, wid: workplace.id }, (err, newClient) => {
      if (err) reject(err);
      resolve(newClient);
    });
  });
};

export const createProject = async ({ name, hours }, projectName, clientID) => {
  const workplace = await getWorkspace();
  return new Promise((resolve, reject) => {
    toggl.createProject(
      {
        name: projectName + "-" + name,
        wid: workplace.id,
        cid: clientID,
        billable: true,
        auto_estimates: false,
        estimated_hours: hours
      },
      (err, newProject) => {
        if (err) reject(err);
        resolve(newProject);
      }
    );
  });
};
export const deleteProject = async id => {
  return new Promise((resolve, reject) => {
    toggl.deleteProject(id, (err, newProject) => {
      if (err) reject(err);
      resolve(newProject);
    });
  });
};

export const getTogglClientProjects = async clientID => {
  const workplace = await getWorkspace();
  return new Promise((resolve, reject) => {
    toggl.getWorkspaceProjects(workplace.id, (err, projects) => {
      if (err) reject(err);
      if (!projects) {
        projects = [];
      }
      const clientProjects = projects.filter(
        project => project.cid === clientID
      );
      resolve(clientProjects);
    });
  });
};

export const createTask = async ({ name, uid, hours }, projectID) => {
  return new Promise((resolve, reject) => {
    toggl.createTask(
      name,
      projectID,
      { name, pid: projectID },
      (err, newTask) => {
        if (err) reject(err);
        resolve(newTask);
      }
    );
  });
};
export const getProjectTasks = async projectID => {
  return new Promise((resolve, reject) => {
    toggl.getProjectTasks(projectID, (err, tasks) => {
      if (err) reject(err);
      resolve(tasks);
    });
  });
};

export const verifyUser = async email => {
  const workplace = await getWorkspace();
  return new Promise((resolve, reject) => {
    toggl.getWorkspaceUsers(workplace.id, true, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          users.find(user => user.email.toUpperCase() === email.toUpperCase())
        );
      }
    });
  });
};
// export const createTasks = async ({ projectID, data }) => {
//   console.log({ projectID, data });
//   const tasksP = data.map(({ name }) => {
//     console.log({ name, projectID });
//     return createTask({ name }, projectID);
//   });
//   const tasks = await Promise.all(tasksP);
//   return tasks;
// };
