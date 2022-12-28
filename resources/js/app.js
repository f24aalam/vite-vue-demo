import './bootstrap';

import { createApp } from 'vue';
import ListProduct from './components/ListProduct.vue';
import SaveProduct from './components/SaveProduct.vue';

const app = createApp({});

app
    .component('ListProduct', ListProduct)
    .component('SaveProduct', SaveProduct);

app.mount("#app");
