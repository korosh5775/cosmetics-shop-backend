const Category = require('../../../models/categorySchema');

const updateCategory = async (req, res, next)=>{
    try {
        const {categoryId} = req.params
        const {name} = req.body;
        const category = await Category.findById({categoryId});

        if(!category){
            const err = new Error("there is no category to edit");
            err.statusCode = 404 //* not fount
            throw err;
        }

        await Category.updateOne({_id:categoryId},{$set:{name}});

        res.status(200).json("category has been updated");
    } catch (error) {
        next(error)
    }
}
module.exports = updateCategory;