<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask />

                    <!-- List uncompleted of tasks -->
                    <Tasks :tasks="uncompletedTasks" />

                    <!-- Toggle Button -->
                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" @click="($event) => (showCompletedTasks = !showCompletedTasks)">
                            <span v-if="!showCompletedTasks">Show Completed Tasks</span>
                            <span v-else>Hide Completed Tasks</span>
                        </button>
                    </div>

                    <!-- List completed of tasks -->
                    <Tasks :tasks="completedTasks" :show="completedTasksIsVisible && showCompletedTasks" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/task";
import Tasks from "../components/tasks/Tasks.vue";
import NewTask from "../components/tasks/NewTask.vue";

const store = useTaskStore();
const { completedTasks, uncompletedTasks } = storeToRefs(store);
const { fetchAllTasks } = store;

onMounted(async () => {
    await fetchAllTasks();
});

const showToggleCompletedBtn = computed(() => completedTasks.value.length > 0 && uncompletedTasks.value.length > 0);

const completedTasksIsVisible = computed(() => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0);

const showCompletedTasks = ref(false);
</script>
