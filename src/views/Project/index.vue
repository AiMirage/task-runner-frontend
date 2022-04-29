<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="tasks"
        :item-class="itemRowBackground"
    >

      <template #item.result="{ item }">

        <v-progress-linear
            v-if="!isNaN(item.result)"
            v-model="item.result"
            height="25"
            color="primary"
            class="white--text"
        >
          <strong>{{ Math.ceil(item.result) }}%</strong>
        </v-progress-linear>
        <div v-else>
          {{ item.result }}
        </div>
      </template>

      <template #item.link="{ item }">
        <a :href="item.link">Link</a>
      </template>

    </v-data-table>
  </v-container>
</template>

<script>
export default {

  created() {
    this.$store.dispatch('Tasks/fetchAll', this.$route.params.id);
  },

  computed: {
    tasks() {
      return this.$store.getters['Tasks/tasks'];
    }
  },

  data() {
    return {
      headers: [
        {
          text: "Id",
          value: "id"
        },
        {
          text: "Type",
          value: "type"
        },
        {
          text: "#Occurrences",
          value: "occurrences"
        },
        {
          text: "Result",
          value: "result"
        },
        {
          text: "Created At",
          value: "created_at"
        },
        {
          text: "Started At",
          value: "started_at"
        },
        {
          text: "Ended At",
          value: "ended_at"
        }
      ]
    };
  },

  methods: {
    itemRowBackground(task) {
      switch (task.result) {
        case "Success" :
          return 'task-success';
        case "Failed" :
          return 'task-failed';
        default:
          return;
      }
    },
  },
}
</script>

<style lang="css">
.task-success {
  background-color: rgb(44, 215, 147)
}

.task-failed {
  background-color: rgb(176, 37, 37)
}
</style>