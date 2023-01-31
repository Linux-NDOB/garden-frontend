"use strict";
import { createStore } from 'vuex'; 

export default createStore({
  state: {
    users: [],
    registers: [],    
  },

  getters: {
    users: (state) => state.user,
    registers: (state) => state.registers,
  },

  actions: {
    get_user_by_id: async function ({ commit }, id) {
      const res = await fetch("https://django-server-production-a4ed.up.railway.app/django_api/user_accounts/" + id);
      const users = await res.json();
      commit("set_users", users);
    },

    add_new_register: async function ({ commit }, array) {
      const res = await fetch("https://django-server-production-a4ed.up.railway.app/django_api/registers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temperature_value: array.temperature_value,
          humidity_value: array.humidity_value,
          full_date: array.date,
        }),
      });
      const registers = await res.json();
      //console.log(user);
      M.toast({ html: "REGISTRADO", classes: "rounded indigo" });
      commit("set_registers", registers);
    },
  },
  
  mutations: {
    set_users: function (state, users) {
      state.users = users;
    },
    set_registers: function (state, registers) {
      state.registers = registers;
    },
  },
})
