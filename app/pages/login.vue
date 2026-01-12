<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    router.push('/admin')
  } catch (error: any) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="card">
      <h1 class="title">Acceso Admin</h1>
      <p class="subtitle">Gestiona los videos del onboarding</p>
      
      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="admin@columat.com" required class="input" />
        </div>
        
        <div class="form-group">
          <label>Contraseña</label>
          <input v-model="password" type="password" placeholder="••••••••" required class="input" />
        </div>

        <button type="submit" :disabled="loading" class="btn">
          {{ loading ? 'Ingresando...' : 'Entrar al Panel' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-color: #f9f9f9;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #333;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box; /* Important for width: 100% */
}

.input:focus {
  border-color: #333;
  outline: none;
}

.btn {
  background-color: #333;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 600;
}

.btn:hover {
  background-color: #000;
}

.btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}
</style>
