<template>
<!--INDEX NAVBAR WITH NORMAL OPTIONS FOR MAIN PAGE-->
  <nav class="container">
    <div class="nav-wrapper indigo darken-3">
      <a href="#!" class="brand-logo"
        ><font-awesome-icon icon="fa-solid fa-leaf" />Vivero</a>    

      <ul class="right hide-on-med-and-down">

        <li><font-awesome-icon icon="fa-solid fa-home" /></li>
        <li>
          <a href="#"><router-link to="/">Inicio</router-link> </a>
        </li>
        <li><font-awesome-icon icon="fa-solid fa-face-smile" /></li>
        <li>
          <a href="#"><router-link to="/login">Ingreso</router-link> </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
