<script setup lang="ts">
import type { TocLink } from '@nuxt/content';

interface Props {
  links: TocLink[]
}

const props= withDefaults(defineProps<Props>(), {

  links: () => [],

})

const links = props.links || []
</script>

<template>
  <div class="lg:col-span-3 sticky top-28 h-96  hidden lg:block  justify-self-end">
    <div class="border dark:border-gray-800 p-3 rounded-md min-w-[200px] dark:bg-slate-900">
      <h1 class="text-sm font-bold mb-3 border-b dark:border-gray-800 pb-2">
        Table Of Content
      </h1>
      <NuxtLink
        v-for="link in links" :key="link.id" :to="`#${link.id}`"
        class="block text-xs mb-3 hover:underline"
      >
        {{ link.text }}
      </NuxtLink>
    </div>
  </div>
</template>
