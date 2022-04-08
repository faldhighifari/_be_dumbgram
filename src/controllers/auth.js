// import model here
const { user } = require('../../models');

// import package here
const Joi = require('joi');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

  
    const data = req.body;

    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    try {

    const dataInDB = await user.findOne({
      where: {
        email: data.email,
      },
    });

    if (dataInDB) {
      return res.send({
        error: {
          message: `Email ${data.email} has been used!`,
        },
      });
    }

    // we generate salt (random value) with 10 rounds
    // const salt = await bcrypt.genSalt(10);
    // we hash password from request with salt
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      status: 'customer',
    });

    const SECRET_KEY = 'batch32';
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email },
      SECRET_KEY
    );

    res.status(200).send({
      status: 'success',
      data: {
        name: newUser.name,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.login = async (req, res) => {
  
    const data = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
            },
        });
    }

try {
    const userExist = await user.findOne({
      where: {
        email: data.email,
      },
    });

    if (!userExist) {
        return res.status(401).send({
          status: 'failed',
          message: 'Email or Password did not match!',
        });
      }
  
      const isValid = await bcrypt.compare(req.body.password, userExist.password);
  
      if (!isValid) {
        return res.status(401).send({
          status: 'failed',
          message: 'Email or Password did not match!',
        });
      }

    const SECRET_KEY = 'batch32';
    const token = jwt.sign(
      { id: userExist.id, name: userExist.name, email: userExist.email, status: userExist.status },
      SECRET_KEY
    );

    res.status(200).send({
      status: 'success',
      data: {
        
        name: userExist.name,
        email: userExist.email,
        token,
      
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};