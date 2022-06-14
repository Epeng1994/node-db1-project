const db = require('../../data/db-config')

const getAll = (query) => {
  //limit ? undefined
  //sortdir ? undefined
  /*const {limit, sortby, sortdir} = query
  console.log(limit, sortby, sortdir)
  if(sortdir && limit){
    return db('accounts').orderBy(sortdir, sortby ? sortby : 'asc').limit(limit)
  }else if(limit){
    return db('accounts').limit(limit)
  }else{*/
    return db('accounts')
  //}
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where("id",id)
}

const create = account => {
  // DO YOUR MAGIC
  return db('accounts').insert(account)
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts').where("id",id).update(account)
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({id:id}).delete()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
