<template>
  <div id="return-address-finder" class="h-full w-full">
    <div class="h-full w-full p-4 flex flex-col flex-wrap items-center content-center">

      <div class="w-full lg:w-[900px] mb-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
        <span>{{ values.INFO_TEXT }}</span>
      </div>

      <div class="w-full md:w-[500px] my-4 md:my-[5vh] p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-lg hover:scale-[1.01] ">
        <div class="flex flex-col items-center h-full px-4">
          <h1 class="h-1/5 mt-2">Enter Product Name:</h1>
          <input v-model="query" type="text" name="item name" id="item-name" class="h-6 mt-2 rounded-md" />
          <button
            name="search button" id="search-button" 
            :disabled="loading"
            @click="searchItems" 
            class="w-fit mt-2 py-1 px-2 border border-gray-300 rounded-md bg-white" style="color: #ff8900;"
          >
            Search
          </button>
          <span class="w-full h-60 overflow-y-scroll my-2 p-3 bg-white rounded-lg whitespace-pre-line text-center border border-gray-200">{{ loading ? 'Searching...' : returnAddress }}</span>
        </div>
      </div>

    </div>
  </div>  
</template>

<script setup lang='ts'>
import {ref} from 'vue';
import values from './values.ts'

let query = ref('');
let loading = ref(false);
let returnAddress = ref('-');

const searchItems = async () => {
  loading.value = true;

  const searchEndpointName = 'get-return-address';

  if(!query.value){
    returnAddress.value = "Please enter a product name";
    loading.value = false;
    return;
  }

  const result = await fetch(
    `/api/${searchEndpointName}/${query.value}`
  ).then(res => res.text());
  loading.value = false;
  if(result) {    
    returnAddress.value = result;
    return;
  }

}
</script>