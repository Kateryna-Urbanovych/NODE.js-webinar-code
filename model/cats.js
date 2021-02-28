const Cat = require('./schemas/cat')

const getAll = async () => {
  const results = await Cat.find({})
  return results
}

const getById = async (id) => {
  const result = await Cat.findOne({ _id: id })
  console.log(result.id)
  console.log(result._id)
  return result
}

const create = async (body) => {
  const result = await Cat.create(body)
  return result
}

const update = async (id, body) => {
  const result = await Cat.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  )
  return result
}

const remove = async (id) => {
  const result = await Cat.findByIdAndRemove({ _id: id })
  return result
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
}
