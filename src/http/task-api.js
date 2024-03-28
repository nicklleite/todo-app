import api from "./api";

const resource = '/tasks'

export const allTasks = () => api.get(resource);

export const createTask = (task) => api.post(resource, task);

export const updateTask = (task) => api.put(`${resource}/${task.id}`, task);

export const removeTask = (id) => api.delete(`${resource}/${id}`);

export const completeTask = (id) => api.patch(`${resource}/${id}/complete`);