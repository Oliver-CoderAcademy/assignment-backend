module.exports = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || "127.0.0.1",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DB,
        port: process.env.DB_PORT,
        ssl: true
    }
}