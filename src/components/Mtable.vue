<script>
import { reactive, computed } from "vue";
export default {
 
  data() {
    return {
      vitals: [],
    };
  },
  methods: {
    get: async function () {
      const ans = await fetch("https://django-server-production-a4ed.up.railway.app/django_api/registers/");
      const con = await ans.json();
      this.vitals = con.vitals;
      console.log("Vitals:", this.vitals);
    },
  },
  mounted() {
    M.AutoInit();
    this.get();
  },
};
</script>

<template>
  <div class="card">
    <h5 class="indigo white-text center">TABLA DE REGISTROS</h5>

    <DataTable
      :value="vitals"
      :scrollable="true"
      scrollHeight="400px"
      :loading="false"
    >
      <Column
        field="register_number"
        header="Numero de Registro"
        style="min-width: 200px"
      ></Column>
      <Column
        field="temperature_value"
        header="Temperatura(C)"
        style="min-width: 200px"
      ></Column>
      <Column
        field="humidity_value"
        header="Humedad"
        style="min-width: 200px"
      ></Column>
      <Column
        field="full_date"
        header="Fecha"
        style="min-width: 200px"
      ></Column>
    </DataTable>
  </div>
</template>
