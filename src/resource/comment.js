import database from '../util/database.js'

export const read = (req, res, next) =>
  database
    .selectFrom('comment')
    .selectAll()
    .orderBy('created_at', 'desc')
    .execute()
    .then(comments => res.json(comments))
    .catch(next)

export const write = ({ userID, content }, res, next) =>
  (!userID || !content)
    ? res.status(400).json({ error: 'userID and content are required' })
    : database
      .insertInto('comment')
      .values({ user_id: userID, content })
      .returningAll()
      .executeTakeFirst()
      .then(comment => res.status(201).json(comment))
      .catch(next)
