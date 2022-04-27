<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="projects"
    >

      <template #item.tasks="{ item }">
        <div>Words :
          <p class="d-inline" v-for="(task,index) in item.tasks.words" :key="index">{{ getTaskStatus(task) }} </p>
        </div>
        <v-divider class="my-1"></v-divider>
        <div>Lines :
          <p class="d-inline" v-for="(task,index) in item.tasks.lines" :key="index">{{ getTaskStatus(task) }} </p>
        </div>
        <v-divider class="my-1"></v-divider>
        <div>Chars :
          <p class="d-inline" v-for="(task,index) in item.tasks.chars" :key="index">{{ getTaskStatus(task) }} </p>
        </div>
      </template>

      <template #item.running="{ item }">
        <div>{{ item.running ? '✅' : '❌' }}</div>
      </template>

      <template #item.link="{ item }">
        <a :href="item.link">Link</a>
      </template>

    </v-data-table>

    <!--  New Task Dialog  -->
    <v-col cols="auto">
      <new-task-dialog></new-task-dialog>
    </v-col>

  </v-container>
</template>

<script>

import NewTaskDialog from './NewTaskDialog';

export default {

  components: {
    NewTaskDialog,
  },

  data() {
    return {
      projects: [

        {
          id: "Proj_123",
          tasks: {
            words: ["No", "No", "Failed", "Success", "Running"],
            lines: ["No", "No", "Failed", "Success", "Running"],
            chars: ["Success", "No", "Failed", "Success", "Running"],
          },
          running: true,
          link: 'test.com'
        },

        {
          id: "Proj_456",
          tasks: {
            words: ["No", "Success", "Failed", "Success", "Running"],
            lines: ["Success", "No", "Failed", "Success", "Success"],
            chars: ["Success", "No", "Not Running", "Success", "Running"],
          },
          running: false,
          link: 'test.com'
        },

      ],
      headers: [
        {
          text: "Project",
          value: "id"
        },
        {
          text: "Tasks",
          value: "tasks"
        },
        {
          text: "Running",
          value: "running"
        },
        {
          text: "Link",
          value: "link"
        }
      ]
    };
  },

  methods: {
    getTaskStatus(task) {
      switch (task) {
        case "Success" :
          return '🟢';
        case "Failed":
          return '🔴';
        case "Running":
          return '↪️';
        case "Not Running":
          return '⌛';
        default:
          return '⚪';
      }
    },
  },
}
</script>

<style lang="css">
tr {
  height: 100px !important;
}
</style>