<script setup lang="ts">
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 items-center">
      <div class="px-6">
        <h1 class="text-black dark:text-zinc-300   font-semibold leading-tight text-4xl md:text-5xl my-5">
          {{ $t(`homePage.title`) }}
        </h1>
        <p class="dark:text-zinc-300  ">
          {{ $t(`homePage.description`) }}
        </p>
      </div>
      <div class="px-6 justify-self-center">
        <LogoDog />
      </div>
    </div>
  </div>
</template>
