-- EJECUTA ESTO EN EL SQL EDITOR
-- Para asegurarnos de que la actualización (UPDATE) funciona, necesitamos asegurar que hay una política.

-- 1. Eliminar política de UPDATE anterior si existe
drop policy if exists "Permitir editar a todos" on public.videos;
drop policy if exists "Public update" on public.videos;

-- 2. Crear nueva política de UPDATE pública (ya que estás en modo "sin login")
create policy "Public update" 
on public.videos 
for update 
to public 
using (true) 
with check (true);
