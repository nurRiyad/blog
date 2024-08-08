<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const route = useRoute()

// take category from route params & make first char upper
const category = computed(() => {
  const name = route.params.category || ''
  let strName = ''

  if (Array.isArray(name))
    strName = name.at(0) || ''
  else strName = name
  return strName
})

const { data: currentLocaleData } = await useAsyncData(`category-data-${category.value}-${locale.value}`, () =>
  queryContent(`${locale.value}/blogs`)
    .where({ tags: { $contains: category.value } })
    .find(),
)

const { data: enData } = await useAsyncData(`category-data-${category.value}-en`, () => 
  queryContent('en/blogs')
    .where({ tags: { $contains: category.value } })
    .find()
);

const formattedData = computed(() => {
  const currentLocaleBlogs = currentLocaleData.value?.map((articles) => {
    return {
      path: articles._path,
      title: articles.title || 'no-title available',
      description: articles.description || 'no-description available',
      image: articles.image || '/blogs-img/blog.jpg',
      alt: articles.alt || 'no alter data available',
      ogImage: articles.ogImage || '/blogs-img/blog.jpg',
      date: articles.date || 'not-date-available',
      tags: articles.tags || [],
      published: articles.published || false,
      locale: locale.value
    }
  }) || [];

  const enBlogs = enData.value?.map((articles) => {
    return {
      path: articles._path,
      title: articles.title || 'no-title available',
      description: articles.description || 'no-description available',
      image: articles.image || '/blogs-img/blog.jpg',
      alt: articles.alt || 'no alter data available',
      ogImage: articles.ogImage || '/blogs-img/blog.jpg',
      date: articles.date || 'not-date-available',
      tags: articles.tags || [],
      published: articles.published || false,
      locale: 'en'
    }
  }) || [];


  const blogMap = new Map();

  currentLocaleBlogs.forEach(blog => {
    const fileName = blog.path?.replace(`${locale.value}/blogs/`, '');
    blogMap.set(fileName, blog);
  });

  enBlogs.forEach(enBlog => {
    const fileName = enBlog.path?.replace('en/blogs/', '');
    const currentLocaleBlog = blogMap.get(fileName);
    if (!currentLocaleBlog) {
     
      blogMap.set(fileName, {
        ...enBlog,
        path: enBlog.path?.replace('/en/', `/${locale.value}/`)
      });
    }
   
  });

  return Array.from(blogMap.values());
})

useHead({
  title: category.value,
  meta: [
    {
      name: 'description',
      content: `You will find all the ${category.value} related post here`,
    },
  ],
})

// Generate OG Image
const siteData = useSiteConfig()
defineOgImage({
  props: {
    title: category.value?.toUpperCase(),
    description: `You will find all the ${category.value} related post here`,
    siteName: siteData.url,
  },
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4">
    <CategoryTopic />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <BlogCard
        v-for="post in formattedData"
        :key="post.title"
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
      <BlogEmpty v-if="formattedData.length === 0" />
    </div>
  </main>
</template>