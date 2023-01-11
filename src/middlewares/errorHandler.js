export const errorHandler = (err, req, res) => {
  res.json({ error: err.message })
}
