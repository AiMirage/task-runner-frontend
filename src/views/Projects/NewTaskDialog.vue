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
                label="Count"
                :value="type"
                :rules="typeRules"
                outlined
                dense
                @change="setType"
            ></v-select>

            <v-file-input
                label="Choose File"
                outlined
                dense
                :value="file"
                :rules="fileRules"
                hint="Allowed types are 'txt'"
                @change="setFile"
            ></v-file-input>


          </v-form>
        </v-card-text>
        <v-card-actions class="justify-space-between">

          <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="save"
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
    taskTypes: ['words', 'lines', 'chars'],
    projectId: '',
    projectIdRules: [
      v => !!v || 'Project id is required',
    ],
    type: '',
    typeRules: [
      v => !!v || 'Type is required',
    ],
    file: null,
    fileRules: [
      v => !!v || 'File is required',
    ],
  }),

  methods: {

    setFile(f) {
      this.file = f;
    },

    setType(t) {
      this.type = t;
    },

    save() {
      if (this.validate()) {
        this.busy = true;

        const payload = new FormData();
        payload.append('project_id', this.projectId);
        payload.append('type', this.type);
        payload.append('file', this.file);

        this.$store.dispatch('Tasks/create', payload).then(res => {
          this.$store.dispatch('Projects/fetchAll');
        }).finally(() => {
          this.busy = false;
        });
      }
    },

    validate() {
      return this.$refs.form.validate()
    },
  },
}
</script>