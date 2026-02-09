
import fs from 'fs';
import path from 'path';
import pg from 'pg';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The SQL file is in SQL/borasio.sql relative to the project root.
// This script is in scripts/create_tables.ts relative to the project root.
const sqlFilePath = path.resolve(__dirname, '../../SQL/borasio.sql');

async function main() {
    console.log('Starting execution of SQL script...');
    
    // Read SQL file
    let sqlContent: string;
    try {
        sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');
        console.log(`Read SQL file from: ${sqlFilePath}`);
    } catch (err) {
        console.error('Error reading SQL file:', err);
        process.exit(1);
    }
    
    // Check for DATABASE_URL
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('Error: DATABASE_URL not found in environment variables.');
        process.exit(1);
    }
    
    // Connect to database
    // Usually Neon requires SSL. We'll enable it unless localhost.
    const isLocalhost = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');
    const sslConfig = isLocalhost ? false : { rejectUnauthorized: false };

    console.log(`Connecting to database with SSL: ${!isLocalhost}`);

    const pool = new pg.Pool({
        connectionString,
        ssl: sslConfig
    });
    
    try {
        const client = await pool.connect();
        try {
            console.log('Connected to database.');
            
            // Execute the whole SQL script
            // pg executes multiple statements if provided in a single string
            await client.query(sqlContent);
            
            console.log('SQL executed successfully.');
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Error executing SQL:', err);
        process.exit(1); // Ensure non-zero exit code on failure
    } finally {
        await pool.end();
    }
}

main();
