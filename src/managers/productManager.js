const product = []
const uniqid = require("uniqid");

exports.getAll = () => product.slice();

exports.create = (productData) => {
    const newProduct = {
        id: uniqid(),
        ...productData
    }
    product.push(newProduct)

    return newProduct
}