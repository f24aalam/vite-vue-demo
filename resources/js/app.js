import './bootstrap';

import { createApp } from 'vue';
import ListProduct from './components/ListProduct.vue';

const app = createApp({});

app.component('ListProduct', ListProduct);

app.mount("#app");
