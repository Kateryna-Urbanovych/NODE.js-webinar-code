const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for cat'],
      unique: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 25,
    },
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: (data) => (!data ? [] : data),
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

catSchema.plugin(mongoosePaginate)
const Cat = model('cat', catSchema)

module.exports = Cat
