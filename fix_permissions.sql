-- FIX PERMISSION DENIED SCHAME PUBLIC
-- Problema: El rol anónimo ('anon') no tiene permiso de USO sobre el esquema 'public'

-- 1. Dar permisos de uso sobre el esquema
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- 2. Dar permisos sobre TODAS las tablas actuales en public
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;

-- 3. Dar permisos sobre TODAS las secuencias (para los IDs autoincrementales)
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 4. Asegurar permisos para futuras tablas (opcional pero recomendado)
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
