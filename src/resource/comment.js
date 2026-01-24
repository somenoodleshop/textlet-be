import database from '../util/database.js'

export const read = (req, res, next) =>
  database
    .selectFrom('comment')
    .selectAll()
    .orderBy('created_at', 'desc')
    .execute()
    .then(comments => res.json(comments))
    .catch(next)

export const write = ({ user_id, content }, res, next) =>
  (!user_id || !content)
    ? res.status(400).json({ error: 'user_id and content are required' })
    : database
      .insertInto('comment')
      .values({ user_id, content })
      .returningAll()
      .executeTakeFirst()
      .then(comment => res.status(201).json(comment))
      .catch(next)
