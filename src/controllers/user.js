const { user, profile, product } = require('../../models')


exports.addUsers = async (req, res) => {
    try {
    const data = req.body;
    const createdData = await user.create(data);
    // console.log(createdData);
  
      res.send({
        status: "success",
        message: "Add user finished",
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

  exports.getUsers = async (req, res) => {
    try {

      // console.log(req.user.status);

      if(!(req.user.status=='admin')){

        return res.status(401).send({
          status: 'failed',
          message: 'You are not Admin!',
        });
      } 

      const users = await user.findAll({
        include: {
          model: profile,
          as: 'profile',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
            },
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      });
  
      res.send({
        status: 'success',
        data: {
          users,
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

  exports.getUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      const data = await user.findOne({
        where: {
          id,
        },
        include: {
            model: profile,
            as: 'profile',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
              },
          },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
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
  
  exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      await user.update(req.body, {
        where: {
          id,
        },
      });
  
      res.send({
        status: 'success',
        message: `Update user id: ${id} finished`,
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
  
  exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      await user.destroy({
        where: {
          id,
        },
        include: {
            model: profile,
            as: 'profile',
        },
      });
  
      res.send({
        status: 'success',
        message: `Delete user id: ${id} finished`,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };

  exports.getUserProducts = async (req, res) => {
    try {

      if(!(req.user.status=='admin')){

        return res.status(401).send({
          status: 'failed',
          message: 'You are not Admin!',
        });
      } 

      const users = await user.findAll({
        where: {
          status: 'seller',
        },
        include: {
          model: product,
          as: 'products',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'idUser'],
          },
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      });
  
      res.send({
        status: 'success',
        data: {
          users,
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