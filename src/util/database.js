import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

const { DB_HOST = 'localhost', DB_PORT = 5432, DB_NAME = 'textlet', DB_USER = 'postgres', DB_PASSWORD = '' } = process.env

const database = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      max: 10 // Maximum number of clients in the pool
    })
  })
})

export default database
