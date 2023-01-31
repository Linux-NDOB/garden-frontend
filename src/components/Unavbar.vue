<script setup>
// IMPORTS
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
// ROUTER VARS
const router = useRouter();
const route = useRoute();
// DISPLAYED NAME
let n = ref("Nombre");
// GET NAME
async function getN() {
  const res = await fetch(
    "https://django-server-production-a4ed.up.railway.app/django_api/user_accounts/" + route.params.id);
  const patients = await res.json();
  //console.log(patients);  
  // SET DISPLAYED NAME
  n.value = patients.user_account.username;
}
onMounted(() => {
  // GET NAME WHEN COMPONENT IS MOUNTED
  getN();
});
</script>

<template>
<!--NORMAL NAVBAR FUNCTIONALITY-->

  <nav class="container blue darken-4">
    <div class="nav-wrapper">
      <a href="" class="brand-logo left"
        ><font-awesome-icon icon="fa-solid fa-leaf" />Vivero </a
      >
      <ul class="right">
        <li><font-awesome-icon icon="fa-solid fa-face-smile"/> </li>

        <li>
          <a>{{ n }}</a>
        </li>

        <li><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></li>

        <li @click='logout'><router-link to="/">Salir</router-link> </li>
      </ul>
    </div>
  </nav>
</template>
