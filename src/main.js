import { createApp } from 'vue'
import App from './App.vue'


import PrimeVue from 'primevue/config';

import router from "./router";
import store from "./store";

import "materialize-css/dist/css/materialize.min.css";
//import 'material-design-icons/iconfont/material-icons.css'

import InputText from "primevue/inputtext";
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';
// elements
import Knob from 'primevue/knob';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';
import Chart from 'primevue/chart';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Password from 'primevue/password';

// -- FONT AWESOME ---
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faLeaf, faFaceSmile, faHome, faRightFromBracket, faFile, faChartSimple } from '@fortawesome/free-solid-svg-icons';


/* add icons to the library */
library.add(faLeaf, faFaceSmile, faHome, faRightFromBracket, faFile, faChartSimple)

createApp(App).use(PrimeVue).use(router).use(store)
  .component("Knob", Knob)
  .component("Menubar", Menubar)
  .component("InputText", InputText)
  .component("Button", Button)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("ColumnGroup", ColumnGroup)
  .component("Row", Row)
  .component("Chart", Chart)
  .component("Calendar", Calendar)
  .component("Checkbox", Checkbox)
  .component("Password", Password)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')

