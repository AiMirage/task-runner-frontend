<template>
  <v-dialog
      transition="dialog-top-transition"
      max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
      >+ New
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >Add New Task
        </v-toolbar>
        <v-card-text class="py-12 px-10">
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >

            <v-text-field
                outlined
                dense
                v-model="projectId"
                :rules="projectIdRules"
                label="Project Id"
                required
            ></v-text-field>

            <v-select
                :items="taskTypes"
                label="Type"
                outlined
                dense
            ></v-select>

            <v-file-input
                label="Choose File"
                outlined
                dense
                hint="Allowed types are 'txt'"
            ></v-file-input>


          </v-form>
        </v-card-text>
        <v-card-actions class="justify-space-between">

          <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="validate"
              :loading="busy"
          >
            Save
          </v-btn>


          <v-btn
              @click="dialog.value = false"
          >Close
          </v-btn>

        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    busy: false,
    valid: true,
    taskTypes: ['Count Words', 'Count Lines', 'Count Characters'],
    projectId: '',
    projectIdRules: [
      v => !!v || 'Project id is required',
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>