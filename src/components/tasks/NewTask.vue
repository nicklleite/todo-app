<template>
    <div class="relative">
        <input type="text" class="form-control form-control-lg padding-right-lg" placeholder="+ Add new task. Press enter to save." @keydown.enter="addTask" />
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useTaskStore } from "../../stores/task";

const store = useTaskStore();
const { handleAddedTask } = store;

const newTask = reactive({
    name: "",
    is_completed: false,
});

const addTask = async (e) => {
    if (e.target.value.trim()) {
        newTask.name = e.target.value;
        e.target.value = "";

        await handleAddedTask(newTask);
    }
};
</script>
