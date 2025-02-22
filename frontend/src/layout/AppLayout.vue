<script setup>
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { ref } from 'vue'

const selectedNav = ref('Dashboard')
const navs = ref([
  {
    icon: 'pi pi-home',
    label: 'Dashboard',
  },
  {
    icon: 'pi pi-bookmark',
    label: 'Bookmarks',
  },
  {
    icon: 'pi pi-users',
    label: 'Team',
  },
  {
    icon: 'pi pi-comments',
    label: 'Messages',
  },
  {
    icon: 'pi pi-calendar',
    label: 'Calendar',
  },
])
</script>

<template>
  <div class="bg-surface-0 dark:bg-surface-950">
    <div class="relative flex items-center justify-between gap-6">
      <div class="flex items-center gap-3 px-8 py-4 h-full">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/efile-buddy.appspot.com/o/website-images%2FeFileBuddy%20logo%20header.svg?alt=media&token=5f521407-4157-4964-a021-4513a51676ae"
          alt="Efile Logo"
          class="h-6 dark:invert"
        >
      </div>
      <a
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          leaveToClass: 'hidden',
          hideOnOutsideClick: true,
        }"
        class="mr-8 cursor-pointer block lg:hidden text-surface-900 dark:text-surface-0"
      >
        <i class="pi pi-bars text-xl" />
      </a>
      <div
        class="flex-1 lg:shadow-none shadow-md rounded-b-xl lg:rounded-none p-4 top-full right-0 w-full bg-surface-0 dark:bg-surface-950 absolute lg:static lg:flex hidden lg:flex-row flex-col items-center justify-between transition-all"
      >
        <div class="flex items-center gap-2 lg:flex-row flex-col">
          <template v-for="(item, index) of navs" :key="index">
            <Button
              v-if="selectedNav === item.label"
              :label="item.label"
              :icon="item.icon"
              outlined
              severity="secondary"
              class="lg:w-auto w-full !bg-surface-100 dark:!bg-surface-800 !text-surface-900 dark:!text-surface-0 !rounded-lg !leading-snug lg:!justify-center !justify-start"
              @click="selectedNav = item.label"
            />
            <Button v-else :label="item.label" :icon="item.icon" text severity="secondary" class="lg:w-auto w-full !rounded-lg !leading-snug lg:!justify-center !justify-start" @click="selectedNav = item.label" />
          </template>
        </div>
        <div class="flex items-center">
          <div class="flex lg:flex-row flex-col gap-2 lg:items-center lg:mt-0 mt-4 w-full">
            <div class="flex items-center lg:flex-row flex-col gap-2 border-y border-surface lg:border-0 py-4 lg:py-0 my-2 lg:my-0">
              <Button outlined severity="secondary" class="!rounded-lg lg:!justify-center !justify-start w-full lg:!w-9 lg:!h-9">
                <i class="pi pi-bell" />
                <span class="lg:hidden">Notifications</span>
              </Button>
              <Button outlined severity="secondary" class="!rounded-lg lg:!justify-center !justify-start w-full lg:!w-9 lg:!h-9">
                <i class="pi pi-cog" />
                <span class="lg:hidden">Settings</span>
              </Button>
            </div>
            <Divider layout="vertical" class="!hidden lg:!block !mx-1" />
            <div class="flex items-center xl:pr-8">
              <Avatar
                image="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-f-1.png"
                class="mr-2 !w-10 xl:!w-9 !h-10 xl:!h-9"
                size="large"
                shape="circle"
              />
              <div class="text-surface-800 dark:text-surface-100 font-medium text-base">
                Jane Sanders
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-8 bg-surface-50 dark:bg-surface-950">
      <div class="bg-surface-0 dark:bg-surface-900 border-2 border-surface border-dashed h-[40rem] rounded-xl" />
    </div>
  </div>
</template>
