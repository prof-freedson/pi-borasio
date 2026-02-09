
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurar dotenv para ler do raiz do backend_node (onde o script é executado via npm run ou npx)
// Assume que o comando é rodado de backend_node/
dotenv.config();

async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('DATABASE_URL não encontrado nas variáveis de ambiente (.env)');
        process.exit(1);
    }

    const isLocalhost = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');
    // Neon precisa de SSL, mas rejectUnauthorized: false é comum para evitar problemas de certificado auto-assinado em alguns ambientes de dev
    const sslConfig = isLocalhost ? false : { rejectUnauthorized: false };

    console.log(`Conectando ao banco de dados... (SSL: ${!isLocalhost})`);

    const pool = new pg.Pool({
        connectionString,
        ssl: sslConfig
    });

    try {
        const client = await pool.connect();
        try {
            console.log('\n--- Verificando Schemas ---');
            const schemas = await client.query("SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')");
            console.log('Schemas encontrados:', schemas.rows.map(r => r.schema_name));

            console.log('\n--- Verificando Tabelas no schema "carona" ---');
            const tablesCarona = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'carona'");
            if (tablesCarona.rows.length === 0) {
                console.log('Nenhuma tabela encontrada no schema "carona".');
            } else {
                console.log(`Encontradas ${tablesCarona.rows.length} tabelas em "carona":`);
                console.log(tablesCarona.rows.map(r => r.table_name).join(', '));
            }

            console.log('\n--- Verificando Tabelas no schema "public" ---');
            const tablesPublic = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
            if (tablesPublic.rows.length === 0) {
                console.log('Nenhuma tabela encontrada no schema "public".');
            } else {
                console.log(`Encontradas ${tablesPublic.rows.length} tabelas em "public":`);
                console.log(tablesPublic.rows.map(r => r.table_name).join(', '));
            }

            // Verificar número de usuários em carona.usuarios se a tabela existir
            const userTable = tablesCarona.rows.find(t => t.table_name === 'usuarios');
            if (userTable) {
                console.log('\n--- Verificando dados em carona.usuarios ---');
                const users = await client.query('SELECT count(*) FROM carona.usuarios');
                console.log(`Total de usuários: ${users.rows[0].count}`);
            }

        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Erro ao conectar ou consultar o banco:', err);
    } finally {
        await pool.end();
    }
}

main();
