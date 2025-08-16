import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
// console.log('Current NODE_ENV:', env);
// console.log(path.resolve(process.cwd(), `.env.${env}`));
  dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    charset: process.env.DB_CHARSET || 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


// export default pool;