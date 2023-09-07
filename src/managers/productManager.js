const cubes = []
const uniqid = require("uniqid");

exports.getAll = () => cubes.slice();
exports.getOne = (cubeId) => cubes.find(x => x.id == cubeId)

exports.create = (productData) => {
    const newProduct = {
        id: uniqid(),
        ...productData
    }
    cubes.push(newProduct)
    console.log(cubes);

    return newProduct
}