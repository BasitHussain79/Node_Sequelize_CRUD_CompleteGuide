const dbConfig = require('../config/dbConfig');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);

sequelize.authenticate()
.then(() => {
    console.log('Connected');
}).catch((err) => {
    console.log(err);
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./productModel.js')(sequelize, DataTypes);
db.reviews = require('./reviewModel.js')(sequelize, DataTypes);
db.tags = require('./tags.js')(sequelize, DataTypes);

db.sequelize.sync({force: false})
.then(() => {
    console.log('Drop and re-sync db.');
});

// one to many
db.products.hasMany(db.reviews, {as: 'reviews'});
db.reviews.belongsTo(db.products, {
    foreignKey: 'productId',
    as: 'product'
})

// many to many
db.tags.belongsToMany(db.products, {
    through: 'product_tag',
    as: 'products',
    foreignKey: 'tag_id'
})

db.products.belongsToMany(db.tags, {
    through: 'product_tag',
    as: 'tags',
    foreignKey: 'product_id'
})

module.exports = db;

