const db = require("../models");

// create main model
const Product = db.products;
const Review = db.reviews;
const Tag = db.tags;

// create product
const addProduct = async (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // create a product
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // save Product in the database
  try {
    const product = await Product.create(info);
    res.status(200).send(product);
    console.log(product);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Product",
    });
  }
};

// get all products
const getAllProducts = async (req, res) => {
  // let products = await Product.findAll({
  //     attributes: [
  //         'title',
  //         'price'
  //     ]
  // });

  let products = await Product.findAll({});
  res.status(200).send(products);
  console.log(products);
};

// get single products
const getSingleProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
};

// update a product
const updateProduct = async (req, res) => {
  let id = req.params.id;
  const product = await Product.update(req.body, { where: { id: id } });
  res.status(200).send('Product is Updated');
};

// delete a product
const deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({ where: { id: id } });
  res.status(200).send("Product is deleted");
};

// get published product
const getPublishedProduct = async (req, res) => {
  const products = await Product.findAll({ where: { published: true } });
  res.status(200).send(products);
};

const getAllProductWithReviews = async (req, res) => {
  const products = await Product.findAll({include: [{
    model: Review,
    as: 'reviews'
  }]});
  res.status(200).send(products);
};

const getAllProductsWithTags = (req, res) => {
  return Product.findAll({
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        // through: {
        //   attributes: ["tag_id", "tutorial_id"],
        // },
      },
    ],
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.log(">> Error while retrieving Tutorials: ", err);
    });
}

const getProductWithTagsById = (req, res) => {
  const id = req.params.id;

  return Product.findByPk(id, {
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        // through: {
        //   attributes: ["tag_id", "tutorial_id"],
        // },
      },
    ],
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.log(">> Error while finding product: ", err);
    });
}

module.exports = {
  addProduct,
  getAllProducts,
  getPublishedProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProductWithReviews,
  getAllProductsWithTags,
  getProductWithTagsById
};
