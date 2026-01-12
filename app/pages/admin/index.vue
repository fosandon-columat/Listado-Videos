<script setup lang="ts">
import { categories, subcategories } from '../../data/videos';

definePageMeta({
  middleware: 'auth'
})

const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// Fetch videos
const { data: videos, refresh } = await useAsyncData('admin-videos', async () => {
    const { data } = await client.from('videos').select('*').order('id', { ascending: false })
    return data || []
})

// Form handling
const newVideo = ref({
    title: '',
    description: '',
    url: '',
    category: categories[0],
    subcategory: ''
})
const isSubmitting = ref(false)
const editingId = ref<number | null>(null) // Para saber si estamos editando

// Cargar datos en el formulario para editar
const handleEdit = (video: any) => {
    editingId.value = video.id
    newVideo.value = {
        title: video.title,
        description: video.description || '',
        url: video.url,
        category: video.category,
        subcategory: video.subcategory || ''
    }
    // Scroll hacia el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleCancelEdit = () => {
    editingId.value = null
    newVideo.value = {
        title: '',
        description: '',
        url: '',
        category: categories[0],
        subcategory: ''
    }
}

const handleAddOrUpdate = async () => {
    isSubmitting.value = true
    try {
        const payload = {
            title: newVideo.value.title.trim(),
            description: newVideo.value.description.trim(),
            url: newVideo.value.url.trim(),
            category: newVideo.value.category,
            subcategory: newVideo.value.subcategory.trim()
        }

        let error
        
        if (editingId.value) {
            // UPDATING existing video
            const result = await client.from('videos').update(payload).eq('id', editingId.value)
            error = result.error
        } else {
            // INSERTING new video
            const result = await client.from('videos').insert(payload)
            error = result.error
        }
        
        if(error) throw error
        
        // Reset form
        handleCancelEdit()
        await refresh()
        // alert(editingId.value ? 'Video actualizado' : 'Video guardado')
    } catch (e: any) {
        console.error('Error detallado:', e)
        alert('Error al guardar: ' + (e.message || e.error_description || JSON.stringify(e)))
    } finally {
        isSubmitting.value = false
    }
}

const handleDelete = async (id: number) => {
    if(!confirm('¿Estás seguro de eliminar este video?')) return
    
    const { error } = await client.from('videos').delete().eq('id', id)
    if(error) {
        alert('Error al eliminar')
    } else {
        await refresh()
    }
}

// const handleLogout = async () => {
//     await client.auth.signOut()
//     router.push('/login')
// }
</script>

<template>
  <div class="admin-container">
    <header class="admin-header">
        <h1>Dashboard Videos</h1>
        <div class="user-info">
            <span class="email-display">{{ user?.email }}</span>
            <button @click="handleLogout" class="logout-btn">Salir</button>
        </div>
    </header>

    <div class="admin-content">
        <!-- Formulario -->
        <section class="panel form-panel">
            <h2>{{ editingId ? 'Editar Video' : 'Agregar Nuevo Video' }}</h2>
            <form @submit.prevent="handleAddOrUpdate" class="video-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Título</label>
                        <input v-model="newVideo.title" required placeholder="Ej: Introducción..." class="input" />
                    </div>
                    <div class="form-group">
                        <label>Categoría</label>
                        <select v-model="newVideo.category" class="input">
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Subcategoría (Opcional)</label>
                        <select v-model="newVideo.subcategory" class="input">
                            <option value="">- Ninguna -</option>
                            <option v-for="sub in subcategories" :key="sub" :value="sub">{{ sub }}</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>URL (Drive/Youtube)</label>
                    <input v-model="newVideo.url" required type="url" placeholder="https://..." class="input" />
                </div>
                
                <div class="form-group">
                    <label>Descripción</label>
                    <textarea v-model="newVideo.description" rows="3" placeholder="Breve descripción del contenido..." class="input"></textarea>
                </div>

                <div class="form-actions">
                    <button type="submit" :disabled="isSubmitting" class="save-btn">
                        {{ isSubmitting ? 'Guardando...' : (editingId ? 'Actualizar Video' : 'Guardar Video') }}
                    </button>
                    <button v-if="editingId" type="button" @click="handleCancelEdit" class="cancel-btn">
                        Cancelar
                    </button>
                </div>
            </form>
        </section>

        <!-- Listado -->
        <section class="panel list-panel">
            <h2>Videos Activos ({{ videos?.length || 0 }})</h2>
            <div class="table-responsive">
                <table class="videos-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Categoría</th>
                            <th>Subcategoría</th>
                            <th>Link</th>
                            <!-- <th class="actions-col">Acciones</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="video in videos" :key="video.id">
                            <td>
                                <strong>{{ video.title }}</strong>
                                <div class="small-desc">{{ video.description }}</div>
                            </td>
                            <td><span class="badge">{{ video.category }}</span></td>
                            <td><span v-if="video.subcategory" class="badge sub-badge">{{ video.subcategory }}</span></td>
                            <td>
                                <a :href="video.url" target="_blank" class="link-icon" title="Ver Link">🔗</a>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <!-- <button @click="handleEdit(video)" class="edit-btn" title="Editar">✏️</button>
                                    <button @click="handleDelete(video.id)" class="delete-btn" title="Eliminar">🗑️</button> -->
                                </div>
                            </td>
                        </tr>
                        <tr v-if="!videos || videos.length === 0">
                            <td colspan="4" class="text-center">No hay videos cargados aún.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
  </div>
</template>

<style scoped>
/* Estilos admin */
.admin-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Helvetica Neue', sans-serif;
    color: #444;
}
.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.email-display {
    font-size: 0.9rem;
    color: #888;
    margin-right: 15px;
}

.logout-btn {
    background: white;
    border: 1px solid #ddd;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
}
.logout-btn:hover { background: #fee; border-color: #faa; color: #c00; }

.admin-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.panel {
    background: white;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    border: 1px solid #eee;
}

h2 { font-size: 1.2rem; margin-top: 0; margin-bottom: 20px; color: #333; }

/* Form */
.video-form { display: flex; flex-direction: column; gap: 15px; }
.form-row { display: flex; gap: 15px; }
.form-row .form-group { flex: 1; }
.form-group { width: 100%; } /* Ensure fullness */
.form-group label { display: block; font-size: 0.85rem; margin-bottom: 5px; color: #666; font-weight: 500; }

.input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.95rem;
    box-sizing: border-box; /* Critical for 100% width padding calculation */
    background-color: #fff;
}
.input:focus { border-color: #333; outline: none; }

.save-btn {
    background: #333;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    align-self: flex-start;
}
.save-btn:hover { background: #000; }
.save-btn:disabled { background: #ccc; cursor: not-allowed; }

.cancel-btn {
    background: transparent;
    color: #666;
    border: 1px solid #ddd;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    margin-left: 10px;
}
.cancel-btn:hover { background: #eee; }

/* Table */
.videos-table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
.videos-table th { text-align: left; padding: 12px; border-bottom: 2px solid #eee; color: #555; font-size: 0.85rem; text-transform: uppercase; }
.videos-table td { padding: 12px; border-bottom: 1px solid #f5f5f5; vertical-align: middle; }
.small-desc { font-size: 0.8rem; color: #888; margin-top: 4px; max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.badge { background: #eee; padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; color: #555; }
.sub-badge { background: #e3f2fd; color: #1976d2; }
.link-icon { text-decoration: none; font-size: 1.2rem; }
.action-buttons { display: flex; gap: 8px; }
.edit-btn { background: transparent; border: none; cursor: pointer; font-size: 1.1rem; opacity: 0.6; transition: opacity 0.2s; }
.edit-btn:hover { opacity: 1; transform: scale(1.1); }
.delete-btn { background: transparent; border: none; cursor: pointer; font-size: 1.1rem; opacity: 0.6; transition: opacity 0.2s; }
.delete-btn:hover { opacity: 1; transform: scale(1.1); }
.text-center { text-align: center; color: #999; padding: 30px; }

@media(max-width: 600px) {
    .form-row { flex-direction: column; }
}
</style>
