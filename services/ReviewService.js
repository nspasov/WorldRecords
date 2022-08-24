const Review = '../models/ReviewModel';
const log = require('npmlog');

const deleteReview = async (id) => {
    try{
        await Review.findByIdAndDelete(id);

    }catch(err){
        log('Deleting Review', err);
    }
}


module.exports = {
    deleteReview
}