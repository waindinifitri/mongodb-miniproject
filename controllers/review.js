const { Review } = require("../models/review");

exports.addReview = async (req,res, next) => {
    const { review, rating } = req.body;
    try {
        const result = await Movie.findOne({
            where: {
                title
            }
        })
        if (result) {
            res.status(409).json({msg: 'Movie already exists.'})    
        } else {
            const newMovie = await Movie.create({
                title, 
                year,
                imageMovie
            })
            res.status(201).json({newMovie: newMovie})
        }
        
    } catch (error) {
    console.log(error)
        next(error)
    }
}