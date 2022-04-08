const { product, category, categoryProduct } = require('../../models')

exports.addCategories = async (req, res) => {
    try {

      if(!(req.user.status=='admin')){

        return res.status(401).send({
          status: 'failed',
          message: 'You are not Admin!',
        });
      } 

    const data = req.body;
    const createdData = await category.create(data);
    // console.log(createdData);
  
      res.send({
        status: "success",
        message: "Add category finished",
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

  exports.getCategories = async (req, res) => {
    try {
      const categories = await category.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
  
      res.send({
        status: 'success',
        data: {
            categories,
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

  exports.getCategoryDetails = async (req, res) => {
    try {
      const categories = await category.findAll({
        include:{

          model: product,
          as: 'products',
          through: {
          model: categoryProduct,
          as: 'bridge',
          },
          attributes: {
              exclude: ['createdAt', 'updatedAt'],
        },

        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
  
      res.send({
        status: 'success',
        data: {
            categories,
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

  exports.getCategoryDetail = async (req, res) => {
    try {

      const { name } = req.params;

      const categories = await category.findOne({
        where: {
          name,
        },
        include:{

          model: product,
          as: 'products',
          through: {
          model: categoryProduct,
          as: 'bridge',
          },
          attributes: {
              exclude: ['createdAt', 'updatedAt'],
        },

        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
  
      res.send({
        status: 'success',
        data: {
            categories,
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

  exports.updateCategory = async (req, res) => {
    try {
      
      if(!(req.user.status=='admin')){

        return res.status(401).send({
          status: 'failed',
          message: 'You are not Admin!',
        });
      } 

      const { id } = req.params;
  
      await category.update(req.body, {
        where: {
          id,
        },
      });
  
      res.send({
        status: 'success',
        message: `Update category id: ${id} finished`,
        data: req.body,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };
  

  exports.deleteCategory = async (req, res) => {
    try {
      
      if(!(req.user.status=='admin')){

        return res.status(401).send({
          status: 'failed',
          message: 'You are not Admin!',
        });
      } 
      
      const { id } = req.params;
  
      await category.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: 'success',
        message: `Delete category id: ${id} finished`,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };