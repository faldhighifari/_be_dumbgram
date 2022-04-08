const express = require("express")

const router = express.Router()

// Controller
const { addUsers, getUsers, getUser, updateUser, deleteUser,  getUserProducts } = require('../controllers/user')
const { addProfiles, getProfile, getProfiles, updateProfile, deleteProfile } = require("../controllers/profile")
const { addProducts, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/product")
const { addCategories, getCategories, getCategoryDetails, getCategoryDetail, updateCategory, deleteCategory } = require("../controllers/category")
const { addCategoryProducts, getCategoryProducts } = require("../controllers/categoryproduct")
const { getTransactions, addTransaction } = require('../controllers/transaction');
const { register, login } = require('../controllers/auth');

//Middlewares
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

// Route
router.post('/user', auth, addUsers)
router.get('/user', auth, getUsers)
router.get('/user-products', auth, getUserProducts)
router.get('/user/:id', auth, getUser)
router.patch('/user/:id', auth, updateUser)
router.delete('/user/:id', auth, deleteUser)


router.post("/profile", auth, addProfiles)
router.get("/profile", auth, getProfiles)
router.get("/profile/:id", auth, getProfile)
router.patch("/profile/:id", auth, updateProfile)
router.delete("/profile/:id", auth, deleteProfile)


router.post("/product", auth, uploadFile('image'), addProducts)
router.get("/products", auth, getProducts)
router.get("/product/:id", auth, getProduct)
router.patch("/product/:id", auth, updateProduct)
router.delete("/product/:id", auth, deleteProduct)


router.post("/category", auth, addCategories)
router.get("/category", auth, getCategories)
router.get("/category-detail", auth, getCategoryDetails)
router.patch("/category/:id", auth, updateCategory)
router.delete("/category/:id", auth, deleteCategory)

//fitur
router.get("/category-detail/:name", auth, getCategoryDetail)


router.post("/categoryproduct", auth, addCategoryProducts)
router.get("/categoryproduct", auth, getCategoryProducts)

router.get('/transactions', auth, getTransactions);
router.post('/transaction', auth, addTransaction);

router.post('/register', register);
router.post('/login', login);


module.exports = router