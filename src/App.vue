<script setup lang="ts">
import { ref } from "vue";
import { fetch } from "@tauri-apps/plugin-http";
import Ogcard from "./components/ogcard.vue";

const url = ref("https://alexveebee.is");
const ogdata = ref<ogdata | null>(null);

const loading = ref(false);

// base64 image data
const imgdata = ref<string | null>(null);

async function getOGdata( url: string ) {
  loading.value = true;
  imgdata.value = null;
  ogdata.value = null;
  try {
    const response = await fetch( url );

    // get the response body
    const datatext = await response.text();

    // parse the html for the og tags
    const parser = new DOMParser();
    const doc = parser.parseFromString(datatext, "text/html");
    // https://www.youtube.com/watch?v=mfv9UgTo2-A&t=59s
    // get the og tags

    const ogTags = doc.querySelectorAll("meta[property]");
    // const ogTags = doc.querySelectorAll("meta[property^='og:']");
    const data = new Map<string, string>();

    // loop through the og tags and add them to the data object
    // replace all ":" with "" to make the key more readable
    // and uppser case the first letter of the key
    ogTags.forEach((tag) => {
      const key = tag.getAttribute("property")?.replace( /:/g, "" );
      const value = tag.getAttribute("content");
      console.log(key, value);
      if (key && value) {
        data.set(key, value);
      }
    });

    // get the image data
    const img = doc.querySelector("meta[property='og:image']");
    if (img) {
      const imgurl = img.getAttribute("content");
      if (imgurl) {
        const imgresponse = await fetch(imgurl);
        const imgblob = await imgresponse.blob();
        const reader = new FileReader();
        reader.readAsDataURL(imgblob);
        reader.onloadend = () => {
          imgdata.value = reader.result as string;
        };
      }
    }
    loading.value = false;

    // make map as an object
    return Object.fromEntries(data);
  } catch (error) {
    console.error(error);
    loading.value = false;
    return null;
  }
}
</script>

<template>
  <main>
    <div class="bg-primary p-4 w-full">
      <div class="bg-primary-300 p-4 flex flex-col items-center">
        <div class="flex items-center gap-4">
          <input
            v-model="url"
            type="text"
            placeholder="Enter a URL"
            class="p-2 rounded-lg"
          />
          <button
            @click="() => {
              getOGdata(url).then((data) => {
                if(!data) return;
                ogdata = data;
              });
            }"
            class="bg-primary-500 p-2 rounded-lg text-white"
          >
            Get OG Data
          </button>
        </div>
        <p v-if="loading">Fetching data...</p>
      </div>
      <div class="bg-primary-300 p-4 flex flex-col items-center">
        <Ogcard :url="url" :ogdata="ogdata" :loading="loading" :imgdata="imgdata" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 100vh;
}
</style>
