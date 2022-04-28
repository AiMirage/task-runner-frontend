<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="projects"
    >

      <template #item.tasks="{ item }">
        <div class="my-1">Words :
          <p class="d-inline" v-for="(task,index) in item.tasks.words" :key="index">{{ task }}</p>
        </div>
        <v-divider class="my-1"></v-divider>
        <div class="my-1">Lines :
          <p class="d-inline" v-for="(task,index) in item.tasks.lines" :key="index">{{ task }} </p>
        </div>
        <v-divider class="my-1"></v-divider>
        <div class="my-1">Chars :
          <p class="d-inline" v-for="(task,index) in item.tasks.chars" :key="index">{{ task }} </p>
        </div>
      </template>

      <template #item.running="{ item }">
        <div>{{ item.running ? '✅' : '❌' }}</div>
      </template>

      <template #item.link="{ item }">
        <router-link :to="'/project/'+item.id">Project Link</router-link>
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

  created() {
    this.$store.dispatch('Projects/fetchAll');
  },

  // Release memory
  destroyed() {
    this.$store.commit('Projects/RESET_PROJECTS')
  },

  computed: {
    projects() {
      return this.$store.getters['Projects/projects'];
    }
  },

  data() {
    return {
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

  methods: {},
}
</script>

<style lang="css" scoped>
tr {
  height: 100px !important;
}
</style>