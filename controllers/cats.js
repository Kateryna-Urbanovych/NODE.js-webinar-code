const Cats = require('../models').Cat

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cats = await Cats.findAll({ where: { owner: userId } })
    return res.json({
      status: 'success',
      code: 200,
      data: {
        cats,
      },
    })
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cat = await Cats.findOne({
      where: { id: req.params.id, owner: userId },
    })
    if (cat) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          cat,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cat = await Cats.create({ ...req.body, owner: userId })
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        cat,
      },
    })
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cat = await Cats.findOne({
      where: { id: req.params.id, owner: userId },
    })
    if (cat) {
      await Cats.destroy({
        where: { id: req.params.id, owner: userId },
      })
      return res.json({
        status: 'success',
        code: 200,
        data: {
          cat,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.user.id
    const temp = await Cats.update(req.body, {
      where: { id: req.params.id, owner: userId },
    })
    console.log('🚀 ~ file: cats.js ~ line 96 ~ update ~ temp', temp)
    const cat = await Cats.findOne({
      where: { id: req.params.id, owner: userId },
    })
    if (cat) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          cat,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user.id
    await Cats.update(req.body, {
      where: { id: req.params.id, owner: userId },
    })
    const cat = await Cats.findOne({
      where: { id: req.params.id, owner: userId },
    })
    if (cat) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          cat,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove,
}
