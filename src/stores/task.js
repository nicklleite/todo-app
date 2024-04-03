import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allTasks, createTask, updateTask, completeTask, removeTask } from "../http/task-api";

export const useTaskStore = defineStore("taskStore", () => {
    const tasks = ref([]);

    const completedTasks = computed(() => tasks.value.filter((task) => task.is_completed));

    const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.is_completed));

    const fetchAllTasks = async () => {
        const { data } = await allTasks();
        tasks.value = data.data;
    };

    const handleAddedTask = async (newTask) => {
        const { data: createdTask } = await createTask(newTask);
        tasks.value.unshift(createdTask.data);
    };

    const handleUpdatedTask = async (task) => {
        const { data: updatedTask } = await updateTask(task, {
            name: task.name,
        });

        const currentTask = tasks.value.find((item) => item.id === task.id);
        currentTask.name = updatedTask.data.name;
    };

    const handleCompletedTask = async (task) => {
        // console.log(task)
        const { data: updatedTask } = await completeTask(task, {
            is_completed: task.is_completed,
        });

        const currentTask = tasks.value.find((item) => item.id === task.id);
        currentTask.is_completed = updatedTask.data.is_completed;
    };

    const handleRemovedTask = async (task) => {
        console.log(task);
        await removeTask(task);
        const index = tasks.value.findIndex((item) => item.id === task.id);
        tasks.value.splice(index, 1);
    };

    return {
        fetchAllTasks,
        tasks,
        completedTasks,
        uncompletedTasks,
        handleAddedTask,
        handleUpdatedTask,
        handleCompletedTask,
        handleRemovedTask,
    };
});
