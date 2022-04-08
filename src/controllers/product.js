const { user, product, category, categoryProduct } = require('../../models')


exports.addProducts = async (req, res) => {
    try {
   
      if(!(req.user.status=='seller')){

        return res.status(401).send({
          status: 'failed',
          message: 'You are not Seller!',
        });

      } 
      // option 1
      // data.idUser = req.user.id;

      //option 2
      let data = req.body;

      data.image = req.file.filename;

      data = {
        ...data,
        idUser: req.user.id,
      };

    const createdProduct = await product.create(data);
    // console.log(createdData);

    const productData = await product.findOne({
      where: {
        id: createdProduct.id,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        // {
        //   model: category,
        //   as: 'categories',
        //   through: {
        //     model: productCategory,
        //     as: 'bridge',
        //     attributes: [],
        //   },
        //   attributes: {
        //     exclude: ['createdAt', 'updatedAt'],
        //   },
        // },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
  
      res.send({
        status: "success",
        message: "Add product finished",
        productData,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.getProducts = async (req, res) => {
    try {

      if(!(req.user.status=='admin')){

        return res.status(401).send({
          status: 'failed',
          message: 'You are not Admin!',
        });

      } 

      const products = await product.findAll({
        include: [
        {
            as: 'user',
            model: user,
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        },
        {
            model: category,
            as: 'categories',
            through: {
            model: categoryProduct,
            as: 'bridge',
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
          },
        },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      //path local
      // const PATH_FILE = 'http://localhost:5000/uploads/';

      data = products.map((item) => {
        item.image = process.env.PATH_FILE + item.image;
        return item;
      });
  
      res.send({
        status: 'success',
        data: {
          data,
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

  exports.getProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const data = await product.findOne({
        where: {
          id,
        },
        include: [
          {
              as: 'user',
              model: user,
              attributes: {
                  exclude: ['password', 'createdAt', 'updatedAt'],
              },
          },
          {
              model: category,
              as: 'categories',
              through: {
              model: categoryProduct,
              as: 'bridge',
              },
              attributes: {
                  exclude: ['createdAt', 'updatedAt'],
            },
          },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
    });
  
      res.send({
        status: 'success',
        data: {
          user: data,
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

  exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      await product.update(req.body, {
        where: {
          id,
        },
      });
  
      res.send({
        status: 'success',
        message: `Update product id: ${id} finished`,
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

  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      await product.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: 'success',
        message: `Delete product id: ${id} finished`,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };