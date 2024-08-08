<script setup lang="ts">

const localPath = useLocalePath()

interface Props {
  title: string
  count: number
}

withDefaults(defineProps<Props>(), {
  title: 'No title available',
  count: 0,
})

// some random color for tags
const color = [
  '#dc2626',
  '#d97706',
  '#65a30d',
  '#059669',
  '#0891b2',
  '#0284c7',
  '#4f46e5',
  '#7c3aed',
  '#c026d3',
  '#db2777',
]

// get a random number
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const picAColor = ref(`${color.at(getRandomInt(0, 8))}`)
</script>

<template>
  <div
    class="text-[#F1F2F4]  px-5 py-3 rounded hover:underline
    rand-bg-color hover:scale-[1.05] transition-all duration-500"
  >
    <NuxtLink :to="localPath(`/categories/${title.toLocaleLowerCase()}`)" class="text-lg font-extrabold">
      <h1>#{{ title }}({{ count }})</h1>
    </NuxtLink>
  </div>
</template>

<style scoped>
.rand-bg-color {
  background-color: v-bind(picAColor);
}
</style>
