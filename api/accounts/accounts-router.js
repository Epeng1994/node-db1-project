const express = require('express')
const router = express.Router()
const {getAll,getById,create,updateById,deleteById} = require('./accounts-model')
const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware')
router.use(express.json())

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  getAll()
    .then(result=>res.json(result))
    .catch(error=>next(error))
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account)
})

router.post('/',checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  create(req.body)
    .then(result=>{
      res.status(201).json(req.body)
    })
    .catch(error=>next(error))
})

router.put('/:id',checkAccountId, checkAccountPayload,checkAccountNameUnique,(req, res, next) => {
  // DO YOUR MAGIC
  updateById(req.params.id, req.body)
    .then(result=>{
      res.json(req.body)
    })
    .catch(error=>next(error))
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  deleteById(req.params.id)
    .then(result=>{
      res.json(result)
    })
    .catch(error=>next(error))
})

router.use((error, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
    if(error){
        return res.status(500).json({message:'Server error'})
    }else{
        next()
    }
})

module.exports = router;
