<script setup>
// Components
import Unavbar from '/src/components/Unavbar.vue';
import Mtable from '/src/components/Mtable.vue'
// Imports: for reactivity, router params and chart
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Chart from "primevue/chart";
// Store actions
import { useStore ,mapState, mapActions} from "vuex";
//Store vars
const store = useStore();
// Router var assingment
const router = useRouter();
const route = useRoute();
const id = route.params.id;
// Sensors reactive variables
let temperature_value = ref(0);
let humidity_value = ref(0);
// Date
let dates = new Date().toLocaleDateString();
//----CHART SIDE---
// Declaring chart
const full_chart = ref(null);
// Counter of registers in chart, chart starts reading from zero
let x_axis = 0;
// This method adds data to the chart and updates his content
const update_chart = () =>{
  // full chart is equal to the chart value
  const chart = full_chart.value.chart;
  
  // Adds a new position in the chart, 0, 1 ,2 ,3 ...
  chart.data.labels.push((x_axis += 1));
  // Pushes the temperature and humidity values in the chart position
  chart.data.datasets[0].data.push(temperature_value.value);
  chart.data.datasets[1].data.push(humidity_value.value);
  // New values can be seen on chart
  chart.update();
}
// Labels
const chart_labels = {
  labels: [],
  datasets: [
    {
      label: "Temperatura",
      backgroundColor: "#42A5F5",
      data: [],
    },
    {
      label: "Humedad",
      backgroundColor: "#f44336",
      data: [],
    },
  ],
};
//---MQTT SIDE---
// Create a client instance
const client = new Paho.MQTT.Client("10d41b8b2c124dd7aba746a0ab363b7c.s2.eu.hivemq.cloud",8884, "futon");
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// connect the client
client.connect({onSuccess:onConnect, 	mqttVersion: 3, userName : "futon",	password : "kodokushi", useSSL: true, });
// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("sensors");
  console.log("Connected");
  //const message = new Paho.MQTT.Message("Hello from JS");
  //message.destinationName = "bomb-state";
  //client.send(message); 
}
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
// called when a message arrives
// Assigns the sensor values to reactive variables and calls
// the update_chart method
function onMessageArrived(message) {
  //console.log("onMessageArrived:"+message.payloadString);
  // Message incoming from mqtt server 
  let payload = message.payloadString;
  // Message to json
  let json = JSON.parse(payload);
  
  // Object destructuration
  let { temperature, humidity } = json;
  
  // Assigns values from server to reactive vars
  temperature_value.value = Number(temperature);
  humidity_value.value = Number(humidity);
  // Calls update_chart function
  update_chart();
  console.log(dates)
  // Send data to database
  // Creates an array and puts in the data
  let array = {
    humidity_value : Number(humidity),
    temperature_value :  Number(temperature),
    date : dates,
  };
  // Store action
  store.dispatch('add_new_register', array);
  }
function turnOn() {
  const message = new Paho.MQTT.Message("on");
  message.destinationName = "bomb-state";
  client.send(message); 
  M.toast({ html: "Bomba encendida", classes: "rounded indigo" });
}
function turnOff() { 
  const message = new Paho.MQTT.Message("off");
  message.destinationName = "bomb-state";
  client.send(message); 
  M.toast({ html: "Bomba pagada", classes: "rounded red" });
}
</script>

<template>
 <Unavbar/> 
 <div class="row container">
    <div class="col s12">
      <ul class="tabs">
        <li class="tab col s4">
          <a href="#test1" class="indigo white-text active">Toma de datos</a>
        </li>
        <li class="tab col s4">
          <a href="#test2" class="indigo darken-1 white-text">tabla de datos</a>
        </li>
        <li class="tab col s4">
          <a href="#test3" class="indigo darken-2 white-text" >Control</a>
        </li>
      </ul>
    </div>

    <div id="test1" class="col s12">
      <div class="row align-items center">
        <br />
        <div class="center align-items">
          <div class="col s12">
            <div class="card green">
              <div class="card-content white-text">
                <font-awesome-icon icon="fa-solid fa-file" />

                <span class="card-title">SENSORES EN TIEMPO REAL</span>
                <p>
                  Una vez son tomados los valores de los sensores, 
                  el sistema procede a guardarlos para que pueda
                  revisarlos mas tarde, si quiere ver los datos actualizados en
                  la tabla porfavor recargue la pagina.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col s6">
            <Knob class="" readonly v-model="temperature_value" :min="0" :max="100" />
            <a class="white-text btn indigo darken-1 pulse">Temperatura(Cº)</a>
          </div>

          <div class="col s6">
            <Knob class="" readonly v-model="humidity_value" :min="0" :max="100" />
            <a class="white-text btn indigo darken-2 pulse">Humedad</a>
          </div>
        </div>
        <br />       

      </div>

      <div class="center align-items center">
        <div class="col s12">
          <div class="card blue lighten-1">
            <div class="card-content white-text">
              <font-awesome-icon icon="fa-solid fa-chart-simple" />

              <span class="card-title center"
                >GRAFICA EN TIEMPO REAL DE TODOS LOS SENSORES</span
              >
            </div>
          </div>
        </div>
      </div>

      <Chart ref="full_chart" type="line" :data="chart_labels" />

    </div>

    <div id="test2" class="col s12">
      <Mtable />
    </div>

    <div id="test3" class="col s12">

    <div class="center align-items">
          <div class="col s12">
            <div class="card green">
              <div class="card-content white-text">
                <font-awesome-icon icon="fa-solid fa-file" />

                <span class="card-title">CONTROL DE AUTOMATIZACION</span>
                <p>
                Con estos botones usted podra encender o apagar la bomba de agua y el
                funcionamiento automatico del sistema.
                </p>
              </div>
            </div>
          </div>
        </div>

       <div class='align-items center'>
        <a class='btn green white-text' @click='turnOn'> Encendido</a>
        <a class='btn red white-text' @click='turnOff'> Apagado</a>
      </div> 

         </div>
      </div>
</template>
