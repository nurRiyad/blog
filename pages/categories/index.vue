<script lang="ts" setup>
import { makeFirstCharUpper } from '@/utils/helper'
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const { data: currentLocaleData } = await useAsyncData('all-blog-post-for-category', () => queryContent(`${locale.value}/blogs`).sort({ _id: -1 }).find())

const { data: enData } = await useAsyncData('en-blog-post-for-category', () => 
  locale.value !== 'en' ? queryContent('en/blogs').sort({ _id: -1 }).find() : Promise.resolve([])
);

const allTags = new Map<string, number>()

const blogMap = new Map<string, { tags: string[]; locale: string }>();

currentLocaleData.value?.forEach(blog => {
  const fileName = blog._file?.split('/').pop();
  if (!blogMap.has(fileName!)) {
    blogMap.set(fileName!, {
      tags: blog.tags || [],
      locale: locale.value
    });
  }
});

enData.value?.forEach(blog => {
  const fileName = blog._file?.split('/').pop();
  if (fileName && !blogMap.has(fileName)) {
    blogMap.set(fileName, {
      tags: blog.tags || [],
      locale: 'en'
    });
  }
});

for (const [fileName, value] of blogMap) {
  value.tags.forEach((tag: string) => {
    if (allTags.has(tag)) {
      const cnt = allTags.get(tag)!;
      allTags.set(tag, cnt + 1);
    } else {
      allTags.set(tag, 1);
    }
  });
}

useHead({
  title: 'Categories',
  meta: [
    {
      name: 'description',
      content:
        'Below All the topics are listed on which either I have written a blog or will write a blog in near future.',
    },
  ],
})

// Generate OG Image
const siteData = useSiteConfig()
defineOgImage({
  props: {
    title: 'Categories',
    description: 'Below All the topics are listed on which either I have written a blog or will write a blog in near future.',
    siteName: siteData.url,
  },
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <CategoryHero />
    <div class="flex flex-wrap px-6 mt-12 gap-3">
      <CategoryCard
        v-for="topic in allTags"
        :key="topic[0]"
        :title="makeFirstCharUpper(topic[0])"
        :count="topic[1]"
      />
    </div>
  </main>
</template>