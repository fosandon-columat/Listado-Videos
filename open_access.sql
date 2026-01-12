-- EJECUTA ESTO EN SUPABASE SQL EDITOR
-- Esto permitirá que puedas guardar/borrar videos SIN estar logueado.

-- 1. Eliminar las políticas antiguas que obligaban a estar logueado
drop policy if exists "Admin insertar" on public.videos;
drop policy if exists "Admin borrar" on public.videos;

-- 2. Crear nuevas políticas "abiertas" (Cualquiera con la URL puede editar)
create policy "Permitir insertar a todos" 
on public.videos for insert 
to public 
with check (true);

create policy "Permitir borrar a todos" 
on public.videos for delete 
to public 
using (true);

-- 3. (Opcional) Permitir modificar/update si lo necesitas
create policy "Permitir editar a todos" 
on public.videos for update
to public 
using (true)
with check (true);
