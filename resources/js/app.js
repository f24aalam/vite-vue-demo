import './bootstrap';

import { createApp } from 'vue';
import ComponentA from './ComponentA.vue';

const app = createApp({});

app.component('ComponentA', ComponentA);

app.mount("#app");
