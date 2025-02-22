<template>
    <div class="bg-surface-0 dark:bg-surface-950 flex flex-col items-center justify-center py-20">
        <img
            class="w-96 lg:w-[38rem] h-auto"
            :src="
                isDarkMode
                    ? 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feedback/not-found-6-dark.png'
                    : 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/feedback/not-found-6.png'
            "
            alt="404 Image"
        />
        <div class="p-4 flex flex-col items-center mt-6">
            <h1 class="text-5xl lg:text-7xl font-bold text-surface-900 dark:text-surface-0 text-center">Page Not Found</h1>
            <p class="mt-5 text-xl lg:text-2xl text-surface-700 dark:text-surface-300 text-center">Sorry, we couldn't find the page.</p>
            <RouterLink to="/">
                <Button class="mt-16" label="Back to Home " />
            </RouterLink>
        </div>
    </div>
</template>
<script setup>
import Button from 'primevue/button';
const { isDarkMode } = useLayout();
</script>
