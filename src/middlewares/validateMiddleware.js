// validateMiddleware
module.exports = (validator) => {
    return (req, res, next) => {
   const { error } = validator(req.body)
      if (error) {

      }
      next()
    }
  }