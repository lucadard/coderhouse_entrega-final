export const errorHandler = (err, req, res, next) => {
  const errStatus = err.status || 500
  const errMsg = err.message || 'Something went wrong'
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  })
}
