<script setup>
const props = defineProps({
    'model': Object
})
</script>
<template>
    <nav aria-label="Page navigation example">
        <ul class="flex list-style-none">
            <li class="page-item" v-for="(link, index) in model.links" :key="index">
                <button class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                    v-html="link.label"
                    @click="$emit('onLinkClick', link.url)"
                ></button>
            </li>
        </ul>
    </nav>
</template>
