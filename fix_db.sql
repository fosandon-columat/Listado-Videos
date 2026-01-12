-- EJECUTA ESTO EN EL SQL EDITOR DE SUPABASE PARA ARREGLAR EL ERROR

-- 1. Agregar la columna subcategory si no existe
alter table public.videos 
add column if not exists subcategory text;

-- 2. Asegurar que las políticas permiten insertar esta columna (si hay políticas restrictivas de columnas)
-- En este caso, la politica "Admin insertar" usa "with check (true)", lo cual permite cualquier columna.
-- Pero es bueno verificar que no haya triggers u otras cosas.
