<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  numeric,
} from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      v$: useVuelidate(),
    };
  },
  setup() {
    const store = useStore();
    const state = reactive({
      cc: "",
      password: "",
    });
    const rules = computed(() => {
      return {
        cc: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(15),
          numeric,
        },
        password: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(15),
        },
      };
    });
    const v$ = useVuelidate(rules, state);
    return {state, v$ , store};
  },
  methods: {
   
    exists: async function () {
      const res = await fetch("https://django-server-production-a4ed.up.railway.app/django_api/user_accounts/" + this.state.cc);
      const us = await res.json();
      console.log(us);
      let ex = false;
      us.hasOwnProperty("msg") || this.state.cc == ""
        ? (ex = false)
        : (ex = true);
      console.log("Exists result:" + ex);
      return ex;
    },
    valPass: async function () {
      this.exists();
      console.log("valPass Existe: " + (await this.exists()));
      let ex = await this.exists();
      let isValid = false;
      if (ex == true) {
        const res = await fetch(
          "https://django-server-production-a4ed.up.railway.app/django_api/user_accounts/"  + this.state.cc );
        const us = await res.json();
        this.state.password == us.user_account.user_password
          ? (isValid = true)
          : (isValid = false);
        console.log("Valido: " + isValid);
      } else if (ex == false) {
        isValid = false;
        console.log("Se supone invalid");
      }
      console.log("valPass final:" + isValid);
      return isValid;
    },
    send: async function () {
      let valid = await this.valPass();
      console.log("valid: " + valid);
      this.v$.$validate();
      if (!this.v$.$error && valid == true) {
        let id = this.state.cc;
        this.$router.push({ name: "main", params: { id } });
      } else if (valid == false || this.v$.error) {
        M.toast({ html: "DATOS INCORRECTOS", classes: "rounded red" });
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <br />
    <div class="row align-items center card">
      <div class="col s12 align-items center">
        <br />
        <h5 class="indigo-text cebter">Ingrese sus credenciales</h5>
        <br />
      </div>
      <div class="divider"></div>

      <div class="col s12 m4 l2"><p></p></div>
      <div class="input-field col s12 m4 l8">
        <input id="last_name" type="text" v-model="state.cc" />
        <label for="last_name">Cédula</label>
        <h6 class="red white-text" v-if="v$.cc.$error">
          {{ v$.cc.$errors[0].$message }}
        </h6>
      </div>
      <div class="col s12 m4 l2"><p></p></div>

      <div class="col s12"></div>
      <br />

      <div class="col s12 m4 l2"><p></p></div>
      <div class="input-field col s12 m4 l8">
         <input type="password" v-model="state.password" />
        <label for="password">Contraseña</label>
        <h6 class="red white-text" v-if="v$.password.$error">
          {{ v$.password.$errors[0].$message }}
        </h6>
      </div>
      <div class="col s12 m4 l2"><p></p></div>
    </div>

    <div class="col s12 align-items center">
      <a class="waves-effect waves-light btn indigo white-text" @click="send"
        >Entrar</a
      >
    </div>
  </div>
</template>
