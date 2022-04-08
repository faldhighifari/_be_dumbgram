const { user, profile } = require('../../models')

exports.addProfiles = async (req, res) => {
    try {
   
      let data = req.body;
      data = {
        ...data,
        idUser: req.user.id,
      };

    const createdData = await profile.create(data);
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

  exports.getProfiles = async (req, res) => {
    try {
      const profiles = await profile.findAll({
        include: {
          as: 'user',
          model: user,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
  
      res.send({
        status: 'success',
        data: {
          profiles,
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

  exports.getProfile = async (req, res) => {
    try {

      const { id } = req.params;
  
      const data = await profile.findOne({
        where: {
          id,
        },
        include: {
            as: 'user',
            model: user,
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt'],
            },
          },
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

  exports.updateProfile = async (req, res) => {
    try {

      // const { id } = req.params;

      //example take id by token for this demo
      const idUser = req.user.id;
      
      await profile.update(req.body, {
        where: {
          // id,
          idUser,
        },
      });
  
      res.send({
        status: 'success',
        message: `Update user id: ${idUser} finished`,
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
  

  exports.deleteProfile = async (req, res) => {
    try {

      // const { id } = req.params;

      //example take id by token for this demo
      const idUser  = req.user.id;
  
      await profile.destroy({
        where: {
         // id,
         idUser,
        },
      });
  
      res.send({
        status: 'success',
        message: `Delete profile idUser: ${idUser} finished`,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };