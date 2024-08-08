<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const { data: currentLocaleData } = await useAsyncData('currentLocale', () => 
  queryContent(`${locale.value}/blogs`).sort({ _id: -1 }).find()
);

const elementPerPage = ref(5)
const pageNumber = ref(1)
const searchTest = ref('')

// Fetch English blogs if the current locale is not English
const { data: enData } = await useAsyncData('enLocale', () => 
  locale.value !== 'en' ? queryContent('en/blogs').sort({ _id: -1 }).find() : Promise.resolve([])
);

const formattedData = computed(() => {
  const currentLocaleBlogs = currentLocaleData.value?.map((article) => ({
    path: article._path,
    fileName: article._file,
    title: article.title || 'no-title available',
    description: article.description || 'no-description available',
    image: article.image || '/not-found.jpg',
    alt: article.alt || 'no alter data available',
    ogImage: article.ogImage || '/not-found.jpg',
    date: article.date || 'not-date-available',
    tags: article.tags || [],
    published: article.published || false,
    locale: locale.value
  })) || [];

  const enBlogs = enData.value?.map((article) => ({
    path: article._path,
    fileName: article._file,
    title: article.title || 'no-title available',
    description: article.description || 'no-description available',
    image: article.image || '/not-found.jpg',
    alt: article.alt || 'no alter data available',
    ogImage: article.ogImage || '/not-found.jpg',
    date: article.date || 'not-date-available',
    tags: article.tags || [],
    published: article.published || false,
    locale: 'en'
  })) || [];

  // Combine blogs, preferring the current locale version
  const blogMap = new Map();

  currentLocaleBlogs.forEach(blog => {
    const fileName = blog.fileName?.replace(`${locale.value}/blogs/`, '');
    blogMap.set(fileName, blog);
  });

  enBlogs.forEach(enBlog => {
    const fileName = enBlog.fileName?.replace('en/blogs/', '');
    const currentLocaleBlog = blogMap.get(fileName);
    if (!currentLocaleBlog) {
      // If the blog doesn't exist in the current locale, add the English version
      blogMap.set(fileName, {
        ...enBlog,
        path: enBlog.path?.replace('/en/', `/${locale.value}/`)
      });
    }
    // If the blog exists in both languages, we keep the current locale version (already in the map)
  });

  return Array.from(blogMap.values());
});

const searchData = computed(() => {
  return formattedData.value.filter((data) => {
    const lowerTitle = data.title.toLocaleLowerCase()
    if (lowerTitle.search(searchTest.value) !== -1)
      return true
    else return false
  }) || []
})

const paginatedData = computed(() => {
  return searchData.value.filter((data, idx) => {
    const startInd = ((pageNumber.value - 1) * elementPerPage.value)
    const endInd = (pageNumber.value * elementPerPage.value) - 1

    if (idx >= startInd && idx <= endInd)
      return true
    else return false
  }) || []
})

function onPreviousPageClick() {
  if (pageNumber.value > 1)
    pageNumber.value -= 1
}

const totalPage = computed(() => {
  const ttlContent = searchData.value.length || 0
  const totalPage = Math.ceil(ttlContent / elementPerPage.value)
  return totalPage
})

function onNextPageClick() {
  if (pageNumber.value < totalPage.value)
    pageNumber.value += 1
}

useHead({
  title: 'Archive',
  meta: [
    {
      name: 'description',
      content: 'Here you will find all the blog posts I have written & published on this site.',
    },
  ],
})

// Generate OG Image
const siteData = useSiteConfig()
defineOgImage({
  props: {
    title: 'Archive',
    description: 'Here you will find all the blog posts I have written & published on this site.',
    siteName: siteData.url,
  },
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <ArchiveHero />

    <div class="px-6">
      <input
        v-model="searchTest"
        placeholder="Search"
        type="text"
        class="block w-full bg-[#F1F2F4] dark:bg-slate-900 dark:placeholder-zinc-500 text-zinc-300  rounded-md border-gray-300 dark:border-gray-800 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
    </div>

    <ClientOnly>
      <div v-auto-animate class="space-y-5 my-5 px-4">
        <template v-for="post in paginatedData" :key="post.title">
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

        <ArchiveCard
          v-if="paginatedData.length <= 0"
          title="No Post Found"
          image="/not-found.jpg"
        />
      </div>

      <template #fallback>
        <!-- this will be rendered on server side -->
        <BlogLoader />
        <BlogLoader />
      </template>
    </ClientOnly>

    <div class="flex justify-center items-center space-x-6 ">
      <button :disabled="pageNumber <= 1" @click="onPreviousPageClick">
        <Icon name="mdi:code-less-than" size="30" :class="{ 'text-sky-700 dark:text-sky-400': pageNumber > 1 }" />
      </button>
      <p>{{ pageNumber }} / {{ totalPage }}</p>
      <button :disabled="pageNumber >= totalPage" @click="onNextPageClick">
        <Icon name="mdi:code-greater-than" size="30" :class="{ 'text-sky-700 dark:text-sky-400': pageNumber < totalPage }" />
      </button>
    </div>
  </main>
</template>
