<script setup>
import Ibar from "/src/components/Navbar.vue";
import Footer from "/src/components/Footer.vue";
import Vlogin from '/src/components/Vlogin.vue';
import { onMounted } from "vue";
onMounted(() => {
  M.AutoInit();
});
</script>

<template>
  <Ibar />
  <div class="container">
    <br />
    <div class="row">
      <div class="col s12">
        <ul class="">
          <li class=" col s12 indigo darken-4 ">
            <h5 class="white-text" href="#test1">INICIO DE SESION</h5>
          </li>
         </ul>
      </div>

      <div id="test1" class="col s12">
        <Vlogin />
      </div>
      
    </div>
  </div>
  <Footer />
</template>

