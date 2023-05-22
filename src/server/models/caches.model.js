const mongoose = require('mongoose');

const CacheSchema = new mongoose.Schema(
    {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
     // creator: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData'},
      difficulty: { type: Number },
      description: { type: String },
    },
    { collection: 'cache-data' }
  );
const Cache = mongoose.model('CacheData', CacheSchema);

module.exports = Cache;