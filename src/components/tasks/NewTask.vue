<template>
    <div class="relative">
        <input type="text" class="form-control form-control-lg padding-right-lg" placeholder="+ Add new task. Press enter to save." @keydown.enter="addTask" />
    </div>
</template>

<script setup>
import { reactive } from "vue";

const newTask = reactive({
    name: "",
    is_completed: false,
});

const emit = defineEmits(["added"]);

const addTask = (e) => {
    if (e.target.value.trim()) {
        newTask.name = e.target.value;
        e.target.value = "";

        emit("added", newTask);
    }
    // if (newTask.name.trim() === "") return;

    // emit("added", newTask);
    // newTask.name = "";
};
</script>
