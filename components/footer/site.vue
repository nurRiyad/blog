<script setup lang="ts">
import { footerData } from '~/data'
</script>

<template>
  <div>
    <p class="text-black dark:text-zinc-300   text-base py-1 font-semibold">
      {{ $t('site') }}
    </p>
    <p class="py-2 dark:text-zinc-300 ">
      {{ footerData.aboutTheSite }}
    </p>
  </div>
</template>
