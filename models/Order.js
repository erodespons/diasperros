const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  provider: { type: Schema.Types.ObjectId, ref: 'User' },
  category: String
});

orderSchema.set('timestamps', true);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
