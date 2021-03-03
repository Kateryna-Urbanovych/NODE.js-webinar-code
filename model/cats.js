const Cat = require('./schemas/cat')

const getAll = async (userId) => {
  const results = await Cat.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email sex -_id',
  })
  return results
}

const getById = async (id, userId) => {
  const result = await Cat.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'name email sex -_id',
  })
  return result
}

const create = async (body) => {
  const result = await Cat.create(body)
  return result
}

const update = async (id, body, userId) => {
  const result = await Cat.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  )
  return result
}

const remove = async (id, userId) => {
  const result = await Cat.findOneAndRemove({ _id: id, owner: userId })
  return result
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
}
