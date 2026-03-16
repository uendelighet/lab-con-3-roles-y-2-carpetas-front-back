// 1. IMPORTACIÓN: Sin esto, el servidor no tiene "idioma" para hablar con la Base de Datos.
// Traemos la herramienta oficial de Supabase para poder hacer consultas SQL.
const { createClient } = require('@supabase/supabase-js');

// 2. SEGURIDAD TÁCTICA: Extraemos las llaves del búnker (.env).
// Es vital que estas coordenadas no estén a la vista de civiles. 
// Sin esto, cualquiera podría infiltrarse y borrar nuestras tablas.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// 3. EL ENLACE DE RADIO: Aquí se crea la conexión real.
// "supabase" se convierte en el teléfono configurado para llamar a la base de datos.
// Es el "puente" físico entre nuestro código de Node y los datos en la nube.
const supabase = createClient(supabaseUrl, supabaseKey);

// 4. MODULARIZACIÓN: La orden más importante de este archivo.
// "module.exports" permite que el "teléfono" que acabamos de crear se pueda 
// enviar a otros archivos del cuartel.
// Sin esto, tendríamos que REPETIR este código en los 3 routers de roles, 
// lo cual sería un desorden logístico y un error de diseño grave.
module.exports = supabase;