import asana from "asana";
import config from "../config/apis";
const { asana_token } = config;

/**
 * Asana API
 * used for :
 * Projects managment :
 *  CURD.
 *  tasks or paheses : CURD,
 *
 *
 *
 */

export const client = asana.Client.create().useAccessToken(asana_token);

export const getMe = () => {
  client.users.me().then(function(me) {
    console.log(me);
  });
};
// projects **********

export const getProjects = async () => {
  const res = await client.workspaces.findAll();
  const workplace = res.data[0];

  const projectsRes = await client.projects.findByWorkspace(workplace.gid);
  return projectsRes.data;
};

export const getProject = async id => {
  // const res = await client.workspaces.findAll();
  // const workplace = res.data[0];
  const projectsRes = await client.projects.findById(id);
  return projectsRes;
};
export const createProject = async data => {
  const { name, notes, due_on, owner } = data;
  const res = await client.workspaces.findAll();
  const workplace = res.data[0];
  console.log(workplace);
  const projectsRes = await client.projects.createInWorkspace(workplace.gid, {
    name,
    notes,
    color: "light-green",
    current_status: { color: "green", text: "active" },
    due_on
  });
  if (owner.asanaID)
    await client.projects.addMembers(projectsRes.gid, [owner.asanaID]);
  return projectsRes;
};

export const deleteProject = async id => {
  const projectsRes = await client.projects.delete(id);

  return projectsRes;
};

/// tasks
export const createTasks = async ({ projectID, data }) => {
  const res = await client.workspaces.findAll();
  const workplace = res.data[0];
  // add the project id in the data object
  // client.tasks.addProject();
  let tasksP = data.map(async ({ name, owner, due_date, hours, number }) => {
    const task = await client.tasks.createInWorkspace(workplace.gid, {
      name,
      due_on: due_date
    });
    await Promise.all([
      client.tasks.addProject(task.gid, { project: projectID }),
      client.tasks.update(task.gid, { assignee: owner.email })
    ]);

    return task;
  });

  const tasks = await Promise.all(tasksP);

  return tasks;
};
/// task
export const createTask = async ({ projectID, data }) => {
  const res = await client.workspaces.findAll();
  const workplace = res.data[0];

  const { name, owner, due_date, hours, number } = data;
  const task = await client.tasks.createInWorkspace(workplace.gid, {
    name,
    due_on: due_date
  });

  await client.tasks.addProject(task.gid, { project: projectID });
  return task;
};
export const deleteTask = async id => {
  const task = await client.tasks.delete(id);

  return task;
};

export const verifyUser = async email => {
  const resworkspace = await client.workspaces.findAll();
  const workplace = resworkspace.data[0];

  const user = await client.users.findById(email);

  console.log(user);
  return user;
};
