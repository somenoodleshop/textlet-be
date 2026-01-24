import database from '../util/database.js'

export const read = (req, res, next) =>
  database
    .selectFrom('comment')
    .selectAll()
    .orderBy('created_at', 'desc')
    .execute()
    .then(comments => res.json(comments))
    .catch(next)

export const write = (req, res, next) => {}
