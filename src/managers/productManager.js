const product = []

exports.getAll = () => product.slice();

exports.create = (productData) => {
    const newProduct = {
        id: product.length + 1,
        ...productData
    }
    product.push(newProduct)

    return newProduct
}