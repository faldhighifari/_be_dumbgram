const { user, transaction, product, category, categoryProduct } = require('../../models')

exports.getTransactions = async (req, res) => {
    try {

        const data = await transaction.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idBuyer', 'idSeller', 'idProduct']
            },
            include: [
                {
                    model: product,
                    as: 'product',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idUser', 'qty', 'price']
                    }
                },
                {
                    model: user,
                    as: 'buyer',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
                {
                    model: user,
                    as: 'seller',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
                // {
                //     model: category,
                //     as: 'categories',
                //     through: {
                //     model: categoryProduct,
                //     as: 'bridge',
                //     },
                //     attributes: {
                //         exclude: ['createdAt', 'updatedAt'],
                //   },
                // },
            ]
        })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.addTransaction = async (req, res) => {
    try {

        if(!(req.user.status=='customer')){

            return res.status(401).send({
              status: 'failed',
              message: 'You are not Customer!',
            });
        }

        let data = req.body;

        data = {
        ...data,
            idBuyer: req.user.id,
        };

        const productData = await product.findOne({
            where: {
              id: data.idProduct,
            },
        })

        data = {
        ...data,
            idSeller: productData.idUser,
            price: productData.price,
            status: 'berhasil',
        };

        // res.send({
        //     status: "success",
        //     message: "Add transaction finished",
        //     data,
        //   });

        await transaction.create(data)

        res.send({
            status: 'success',
            message: 'Add transaction finished'
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}