<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, setLocale, locales } = useI18n();
const selectedLanguage = ref(locale.value);
const showLanguages = ref(false);

function toggleLanguage(lang: string) {
  setLocale(lang).then(() => {
    showLanguages.value = false;
    const url = new URL(window.location.href);
    window.open(url.toString(), '_blank');
  });
}

function toggleDropdown() {
  showLanguages.value = !showLanguages.value;
}

function handleClickOutside(event: MouseEvent) {
  const dropdown = document.querySelector('.language-dropdown');
  if (dropdown && !dropdown.contains(event.target as Node)) {
    showLanguages.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <ClientOnly>
    <li class="relative language-dropdown">
      <div
        @click="toggleDropdown"
        class="cursor-pointer"
      >
        <span>文A</span>
      </div>
      <ul
        v-if="showLanguages"
        class="absolute top-full left-0 mt-2 bg-white dark:bg-slate-700 border border-gray-300 rounded shadow-lg z-50"
      >
        <li
          v-for="lang in locales"
          :key="lang.code"
          @click="toggleLanguage(lang.code)"
          class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer flex items-center justify-between"
          :class="{ 'bg-sky-100 dark:bg-sky-800': selectedLanguage === lang.code }"
        >
          <span>{{ lang.name }}</span>
          <Icon name="gridicons:external" size="20" />
        </li>
      </ul>
    </li>
  </ClientOnly>
</template>
