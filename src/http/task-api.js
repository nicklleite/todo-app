import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + '/tasks'

export const allTasks = () => api.get(resource);

export const createTask = (task) => api.post(resource, task);

export const updateTask = (task) => api.put(`${resource}/${task.id}`, task);

export const removeTask = (task) => api.delete(`${resource}/${task.id}`);

export const completeTask = (task) => api.patch(`${resource}/${task.id}/complete`, task);