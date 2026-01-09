<script setup lang="ts">
import { ref, computed } from 'vue';
import { videos, categories } from './data/videos';

const selectedCategory = ref<string>('Todos');

const filteredVideos = computed(() => {
  if (selectedCategory.value === 'Todos') {
    return videos;
  }
  return videos.filter(video => video.category === selectedCategory.value);
});

const selectCategory = (category: string) => {
  selectedCategory.value = category;
};
</script>

<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Videos Onboarding</h1>
      <p class="subtitle">Recursos y tutoriales para tu integración</p>
    </header>

    <nav class="categories-nav">
      <button 
        class="category-chip" 
        :class="{ active: selectedCategory === 'Todos' }"
        @click="selectCategory('Todos')"
      >
        Todos
      </button>
      <button 
        v-for="category in categories" 
        :key="category"
        class="category-chip"
        :class="{ active: selectedCategory === category }"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </nav>

    <main class="videos-grid">
      <article v-for="video in filteredVideos" :key="video.id" class="video-card">
        <div class="card-content">
          <span class="category-tag">{{ video.category }}</span>
          <h2 class="video-title">{{ video.title }}</h2>
          <p class="video-description">{{ video.description }}</p>
          <a :href="video.url" target="_blank" rel="noopener noreferrer" class="watch-link">
            Ver Video 
            <span class="arrow">→</span>
          </a>
        </div>
      </article>
      
      <div v-if="filteredVideos.length === 0" class="empty-state">
        <p>No hay videos disponibles en esta categoría.</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Reset básico y variables */
:global(body) {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Header */
.header {
  margin-bottom: 40px;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0 0 10px;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  font-weight: 300;
}

/* Navegación de Categorías */
.categories-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 50px;
}

.category-chip {
  background: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #555;
  background-color: white;
}

.category-chip:hover {
  border-color: #333;
  color: #333;
}

.category-chip.active {
  background-color: #333;
  color: white;
  border-color: #333;
}

/* Grid de Videos */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

/* Tarjeta de Video */
.video-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.category-tag {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #999;
  margin-bottom: 12px;
  font-weight: 600;
}

.video-title {
  font-size: 1.25rem;
  margin: 0 0 12px;
  font-weight: 600;
  color: #222;
  line-height: 1.4;
}

.video-description {
  font-size: 0.95rem;
  color: #555;
  margin: 0 0 24px;
  line-height: 1.6;
  flex-grow: 1;
}

.watch-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-weight: 600;
  font-size: 0.95rem;
  margin-top: auto;
  transition: color 0.2s;
}

.watch-link .arrow {
  margin-left: 6px;
  transition: transform 0.2s;
}

.watch-link:hover .arrow {
  transform: translateX(4px);
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px;
  color: #888;
  font-style: italic;
}

@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }
  
  .videos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
