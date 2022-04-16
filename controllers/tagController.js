const res = require("express/lib/response");
const db = require("../models");

const Product = db.products;
const Tag = db.tags;

const createTag = async (req, res) => {
  try {
    const tag = await Tag.create({
      name: req.body.name,
    });
    res.status(200).send(tag);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Product",
    });
  }
};

const findAll = async (req, res) => {
  try {
    let tags = await Tag.findAll({
      include: [
        {
          model: Product,
          as: "products",
        attributes: ["id", "title", "description"],
        through: {
        attributes: [],
        },
        },
      ],
    });
    res.status(200).send(tags);
  } catch (err) {
    console.log(">> Error while retrieving Tags: ", err);
  }
};

const findById = async (req, res) => {
  const id = req.params.id;
  try {
    // const tag = await Tag.findById(id, {
    //   include: [
    //     {
    //       model: Product,
    //       as: "products",
    //     //   attributes: ["id", "title", "price"],
    //     //   through: {
    //     //     attributes: [],
    //     //   },
    //     },
    //   ],
    // });
    let tag = await Tag.findOne({
      where: { id: id },
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id", "title", "price"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).send(tag);
  } catch (err) {
    console.log(">> Error while finding Tag: ", err);
  }
};

// add a product to a tag
const addProduct = (req, res) => {
  const tagId = req.body.tagId;
  const productId = req.body.productId;
  return Tag.findByPk(tagId)
    .then((tag) => {
      if (!tag) {
        console.log("Tag not found!");
        return null;
      }
      return Product.findByPk(productId).then((product) => {
        if (!product) {
          console.log("Product not found!");
          return null;
        }
        tag.addProduct(product);
        console.log(`>> added product id=${product.id} to Tag id=${tag.id}`);
        res
          .status(200)
          .send(`added product id=${product.id} to Tag id=${tag.id}`);
        return tag;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

module.exports = {
  createTag,
  findAll,
  findById,
  addProduct,
};
