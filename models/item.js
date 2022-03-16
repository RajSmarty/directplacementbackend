const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
   
    image:String
},{ timestamps: true })

const Item = mongoose.model('Item',itemSchema);
// export default Item;

module.exports = Item;