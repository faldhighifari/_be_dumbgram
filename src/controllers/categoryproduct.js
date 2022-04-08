const { categoryProduct } = require('../../models')

exports.addCategoryProducts = async (req, res) => {
    try {
    const data = req.body;
    const createdData = await categoryProduct.create(data);
    // console.log(createdData);
  
      res.send({
        status: "success",
        message: "Add categoryProduct finished",
        createdData,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.getCategoryProducts = async (req, res) => {
    try {
      const categoryProducts = await categoryProduct.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
  
      res.send({
        status: 'success',
        data: {
            categoryProducts,
        },
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };