import Product from "../models/Product.js";
import ProductDetail from "../models/ProductDetail.js";

//Create
export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

//Update
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

//Delete
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {}
};

//Get Product
export const findProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

//Get all product
export const getProduct = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      // products = await Product.find().sort({ createdAt: -1 }).limit(5);
      products = await Product.find({
        title: {
          $regex: qNew,
        },
      });
    } else if (qCategory) {
      products = await Product.find({
        category: {
          $in: qCategory,
        },
      });
    } else {
      products = await Product.find().sort({ createdAt: -1 });
    }

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

//Search
export const searchProduct = async (req, res, next) => {
  const query = req.query.q;
  try {
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    }).limit(8);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

//Get ProductDetails
export const getProductDetail = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const list = await Promise.all(
      product.details.map((detail) => {
        return ProductDetail.findById(detail);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
