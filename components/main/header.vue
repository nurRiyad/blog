<script setup lang="ts">


const colorMode = useColorMode()
const isMenuOpen = ref(false)
const config = useRuntimeConfig()
const multiLang = ref(config.public.enableI18n)

const localPath = useLocalePath()

function onClick(val: string) {
  colorMode.preference = val
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

</script>

<template>
  <div class="py-5 border-b dark:border-gray-800 font-semibold">
    <div class="flex px-6 container max-w-5xl justify-between mx-auto items-center">
      <ul class="flex items-center space-x-5">
        <li class="text-base sm:text-2xl font-bold">
          <NuxtLink to="/">
            {{ $t('navbarData.homeTitle') }}
          </NuxtLink>
        </li>
      </ul>
      
      <!-- Mobile buttons: Theme toggle and Menu toggle -->
      <div class="flex items-center space-x-4 sm:hidden">
        <ClientOnly>
          <button
            v-if="colorMode.value === 'light'"
            name="light-mode"
            title="Light"
            class="hover:scale-110 transition-all ease-out hover:cursor-pointer"
            @click="onClick('dark')"
          >
            <Icon name="icon-park:moon" size="20" />
          </button>
          <button
            v-else
            name="dark-mode"
            title="Dark"
            class="hover:scale-110 transition-all ease-out hover:cursor-pointer"
            @click="onClick('light')"
          >
            <Icon name="noto:sun" size="20" />
          </button>
        </ClientOnly>
        <button class="text-gray-600 focus:outline-none dark:text-white" @click="toggleMenu">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <transition
        enter-active-class="transition ease-out duration-100 transform"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75 transform"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="isMenuOpen" class="absolute top-16 left-0 right-0 bg-white dark:bg-blue-950 shadow-lg z-50">
          <ul class="px-4 py-2 space-y-2">
            <li>
              <NuxtLink :to="localPath('/blogs')" @click="toggleMenu">
                {{ $t('blogs') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localPath(`/categories`)" @click="toggleMenu">
                {{ $t('categories') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localPath('/about')" @click="toggleMenu" aria-label="About me">
                {{ $t('about') }}
              </NuxtLink>
            </li>
            <li v-if="multiLang==='true'">
              <MainLocalization />
            </li>
          </ul>
        </div>
      </transition>

      <!-- Desktop menu -->
      <ul class="hidden sm:flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg">
        <li>
          <NuxtLink :to="localPath('/blogs')">
            {{ $t('blogs') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localPath(`/categories`)">
            {{ $t('categories') }}
          </NuxtLink>
        </li>
        <li title="About Me">
          <NuxtLink :to="localPath('/about')" aria-label="About me">
            {{ $t('about') }}
          </NuxtLink>
        </li>
        <li>
          <ClientOnly>
            <button
              v-if="colorMode.value === 'light'"
              name="light-mode"
              title="Light"
              class="hover:scale-110 transition-all ease-out hover:cursor-pointer"
              @click="onClick('dark')"
            >
              <Icon name="icon-park:moon" size="20" />
            </button>
            <button
              v-else
              name="dark-mode"
              title="Dark"
              class="hover:scale-110 transition-all ease-out hover:cursor-pointer"
              @click="onClick('light')"
            >
              <Icon name="noto:sun" size="20" />
            </button>
            <template #fallback>
              <!-- this will be rendered on server side -->
              <Icon name="svg-spinners:180-ring" size="20" />
            </template>
          </ClientOnly>
        </li>
        <li v-if="multiLang==='true'">
          <MainLocalization />
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.router-link-active .router-link-exact-active  {
  @apply underline
}
</style>
