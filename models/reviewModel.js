module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('review', {
        rating: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
    })
    return Review;
}
