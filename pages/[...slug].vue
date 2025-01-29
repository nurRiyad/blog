<script setup lang="ts">
useHead({
  title: '404',
  meta: [
    {
      name: 'description',
      content: 'Page not found',
    },
  ],
})

defineOgImageComponent('About', {
  headline: 'Wrong Path',
  title: '404',
  description: 'Page Not Found',
})

// Ensure the SEO meta tags are rendered
const route = useRoute()
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('blogs').path(route.path).first()
})
useSeoMeta(page.value?.seo || {})
</script>

<template>
  <div class="py-5">
    <div class="container max-w-xl mx-auto">
      <Logo404 />
    </div>
  </div>
</template>
