<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";

import Pagination from "../Pagination.vue";

const products = ref({});

onMounted(() => {
    fetchProducts('/products');
});

function onLinkClick(url) {
    fetchProducts(url);
}

async function fetchProducts(url) {
    const response = await axios.get(url);

    if (response.status === 200) {
        products.value = response.data;
    }
}

</script>
<template>
    <table class="w-full">
        <thead class="border-b">
            <tr>
                <th scope="col" class="font-bold text-gray-900 px-6 py-4 text-left">
                    #
                </th>
                <th scope="col" class="font-bold text-gray-900 px-6 py-4 text-left">
                    Name
                </th>
                <th scope="col" class="font-bold text-gray-900 px-6 py-4 text-left">
                    Price
                </th>
                <th scope="col" class="font-bold text-gray-900 px-6 py-4 text-left">
                    Category
                </th>
                <th scope="col" class="font-bold text-gray-900 px-6 py-4 text-left">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b" v-for="product in products.data" :key="product.name">
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">
                    {{ product.id }}
                </td>
                <td class="text-gray-900 px-6 py-4 whitespace-nowrap">
                    {{ product.name }}
                </td>
                <td class="text-gray-900 px-6 py-4 whitespace-nowrap">
                    INR {{ product.price }}/-
                </td>
                <td class="text-gray-900 px-6 py-4 whitespace-nowrap">
                    {{ product.category }}
                </td>
                <td>

                </td>
            </tr>
        </tbody>
    </table>
    <div class="flex justify-end mt-4">
        <Pagination :model="products" @on-link-click="onLinkClick"/>
    </div>
</template>
