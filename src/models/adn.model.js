import mongoose from 'mongoose';

// User schema
const AdnSchema = mongoose.Schema({
  has_mutation: {
    type: Boolean,
  },
});

const AdnModel = mongoose.model('Adn', AdnSchema);

export default AdnModel;
