<script setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import axios from "axios";

const props = defineProps({
    'product': Object
});

const isEdit = computed(() => props.product !== undefined);

const openModel = ref(false);
const form = ref({
    csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    name: '',
    price: 0,
    category: '',
    errors: {}
});

onMounted(() => {
    if (isEdit) {
        form.value = {
            ...form.value,
            ...props.product
        }

        console.log(form.value)
    }
});

function toggleModel() {
    openModel.value = !openModel.value
}

async function createForm() {
    try {
        const response = await axios.post('/products', form.value)
        if (response.status === 201) {
            window.location.reload();
        }
    } catch (error) {
        form.value.errors = error.response.data.errors
    }
}

async function updateForm() {
    try {
        const response = await axios.put(`/products/${props.product.id}`, form.value)
        if (response.status === 200) {
            window.location.reload();
        }
    } catch (error) {
        form.value.errors = error.response.data.errors
    }
}


</script>
<template>
    <button @click="toggleModel" class='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'>
        {{ isEdit ? 'Edit' : 'Create' }}
    </button>
    <div v-if="openModel" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
            <div @click="toggleModel" class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40" aria-hidden="true"></div>

            <div class="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
                <div class="flex items-center justify-between space-x-4">
                    <h1 class="text-xl font-medium text-gray-800 ">Create Product</h1>

                    <button @click="toggleModel" class="text-gray-600 focus:outline-none hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>

                <form class="mt-5">
                    <div>
                        <label for="name" class="block text-sm text-gray-700 capitalize">Product Name</label>
                        <input type="text" v-model="form.name" class="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40">
                        <div v-if="form.errors.name" class="text-red-500 text-sm mt-1">{{ form.errors.name[0] }}</div>
                    </div>

                    <div class="mt-4">
                        <label for="price" class="block text-sm text-gray-700 capitalize">Product Price</label>
                        <input type="number" v-model="form.price" class="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40">
                        <div v-if="form.errors.price" class="text-red-500 text-sm mt-1">{{ form.errors.price[0] }}</div>
                    </div>

                    <div class="mt-4">
                        <label for="category" class="block text-sm text-gray-700 capitalize">Product Category</label>
                        <input type="text" v-model="form.category" class="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40">
                        <div v-if="form.errors.category" class="text-red-500 text-sm mt-1">{{ form.errors.category[0] }}</div>
                    </div>

                    <div class="flex justify-end mt-6">
                        <button type="button" @click="isEdit ? updateForm() : createForm()" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
