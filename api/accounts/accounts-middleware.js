const {getAll,getById} = require('./accounts-model')
const yup = require('yup')


exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const {name, budget} = req.body

  if(name === undefined || budget === undefined){
    return res.status(400).json({ message: "name and budget are required" })
  }

  if(name.trim().length > 100 || name.trim().length < 3){
    return res.status(400).json({ message: "name of account must be between 3 and 100" })
  }

  if(typeof budget !== 'number'){
    return res.status(400).json({ message: "budget of account must be a number" })
  }
  
  if(budget < 0 || budget > 1000000){
    return res.status(400).json({ message: "budget of account is too large or too small" })
  }



  req.body.name = req.body.name.trim()
  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const {name} = req.body
  getAll()
    .then(result=>{
      const uniqueCheck = result.find(a=>a.name === name.trim())
      if(uniqueCheck === undefined ){
        next()
      }else{
        res.status(400).json({ message: "that name is taken" })
      }
    })
    .catch(error=>next(error))
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  getById(req.params.id) 
    .then(result=>{
      if(result.length>0){
        req.account = result[0]
        next()
      }else{
        return res.status(404).json({ message: "account not found" })
      }
    })
    .catch(error=>next(error))
}
