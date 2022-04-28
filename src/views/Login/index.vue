<template>
  <v-container>
    <v-card class="mx-auto px-12 py-10 mt-6" max-width="600px">
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >

        <v-text-field
            outlined
            dense
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>

        <v-text-field
            outlined
            dense
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
        ></v-text-field>

        <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="login"
            :loading="busy"
        >
          Login
        </v-btn>

      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    busy: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required'
    ],
  }),

  methods: {

    login() {
      if (this.validate()) {
        this.busy = true;

        const payload = {email: this.email, password: this.password, device_name: 'test'};

        this.$store.dispatch('Auth/login', payload).then(res => {
          this.$router.push('/');
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