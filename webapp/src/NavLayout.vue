<template>
    <div>
        <nav class="w-full">
            <div class="w-full bg-[#ff8900] h-[51px]"></div>
            <div class="w-full flex flex-row justify-between items-baseline border-b-gray-300 shadow-md" style="padding: 15px;">
                <img height="auto;" src="https://wolffashion.de/cdn/shop/files/1_d0fece64-2d0e-4647-b29f-420dbd75afee_150x.png?v=1695044582" alt="logo">
                <a class="h-fit my-auto" href="javascript:history.back()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </a>
            </div>
        </nav>
        <div class="p-4">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>