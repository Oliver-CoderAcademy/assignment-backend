module.exports = {
    client: 'pg',
    connection: {
        connection: process.env.DATABASE_URL || "127.0.0.1",
        ssl: true
    }
}