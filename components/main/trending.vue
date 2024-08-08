<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

async function fetchArticles(localePath: string, limit: number) {
  return await queryContent(localePath)
    .limit(limit)
    .sort({ _id: 1 })
    .find();
}

const { data: currentLocaleData } = await useAsyncData('trending-post', () => 
  fetchArticles(`/${locale.value}/blogs`, 3)
);

// If current locale doesn't have 3 articles and it's not English, fetch from English
const { data: englishData } = await useAsyncData('english-trending-post', async () => {
  if (locale.value !== 'en' && currentLocaleData.value && currentLocaleData.value.length < 3) {
    const remainingCount = 3 - currentLocaleData.value.length;
    return await fetchArticles('/en/blogs', remainingCount);
  }
  return [];
});


const combinedData = computed(() => {
  const current = currentLocaleData.value || [];
  const english = englishData.value || [];
  return [...current, ...english].slice(0, 3);
});

const formattedData = computed(() => {
  return combinedData.value.map((article) => {
    let path = article._path;
    // If it's an English article and we're not in the English locale, adjust the path
    if (locale.value !== 'en' && path?.startsWith('/en/')) {
      path = `/${locale.value}${path.slice(3)}`;
    }
    return {
      path,
      title: article.title || 'no-title available',
      description: article.description || 'no-description available',
      image: article.image || '/not-found.jpg',
      alt: article.alt || 'no alter data available',
      ogImage: article.ogImage || '/not-found.jpg',
      date: article.date || 'not-date-available',
      tags: article.tags || [],
      published: article.published || false,
    };
  });
});

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: 'Welcome To My Blog Site. Get Web Development, Javascript, Typescript, NodeJs, Vue, and Nuxt, Related Articles, Tips, Learning resources and more.',
    },
  ],
});
</script>

<template>
  <div class="px-4">
    <div class="flex flex-row items-center space-x-3 pt-5 pb-3">
      <Icon name="mdi:star-three-points-outline" size="2em" class="text-black dark:text-zinc-300" />
      <h2 class="text-4xl font-semibold text-black dark:text-zinc-300">
        {{ $t('trending') }}
      </h2>
    </div>
    <div class="grid grid-cols-1">
      <template v-for="post in formattedData" :key="post.title">
        <ArchiveCard
          :path="post.path"
          :title="post.title"
          :date="post.date"
          :description="post.description"
          :image="post.image"
          :alt="post.alt"
          :og-image="post.ogImage"
          :tags="post.tags"
          :published="post.published"
        />
      </template>
      <template v-if="formattedData.length === 0">
        <BlogEmpty />
      </template>
    </div>
  </div>
</template>
