<script setup lang="ts">
const localPath = useLocalePath()
</script>
<template>
  <div class="flex flex-col dark:text-zinc-300   my-5 md:my-0 md:justify-self-center">
    <p class="text-black dark:text-zinc-300  text-base font-semibold">
      {{ $t('quick') }}
    </p>
    <NuxtLink :to="localPath('/')" class="hover:underline">
      {{ $t('home') }}
    </NuxtLink>
    <NuxtLink :to="localPath('/blogs')" class="hover:underline">
      {{  $t('blogs') }}
    </NuxtLink>
    <NuxtLink :to="localPath('/categories')" class="hover:underline">
      {{ $t('categories') }}
    </NuxtLink>
    <NuxtLink :to="localPath('/about')" class="hover:underline">
     {{ $t('about') }}
    </NuxtLink>
  </div>
</template>
