<script setup lang="ts">
defineProps<{
    url: string;
    ogdata: ogdata | null;
    loading: boolean;
    imgdata: string | null;
}>();
</script>

<template>
    <pre class="max-w-[600px] overflow-auto">{{ ogdata }}</pre>
    <div class="relative grid gap-2 max-w-[600px] bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden
        pl-5 
    ">
        <div class="bg-purple-800 w-1 absolute h-full top-0 left-0">

        </div>
        <p class="opacity-50" v-if="ogdata?.ogsite_name">{{ ogdata.ogsite_name }}</p>
        <h2 class="text-2xl">{{ ogdata?.ogtitle }}</h2>
        <p>{{ ogdata?.ogdescription }}</p>
        <img 
          v-if="imgdata"
          :src="imgdata" :alt="ogdata?.ogimageAlt"
          :width="ogdata?.ogimagewidth" :height="ogdata?.ogimageheight"
          class="max-h-[300px] max-w-[600px] w-full object-cover rounded-sm"
          :style="{ aspectRatio: `${ogdata?.ogimagewidth}/${ogdata?.ogimageheight}` }"
        />
        <p v-if="ogdata?.ogimageAlt">{{ ogdata.ogimageAlt }}</p>
    </div>
</template>