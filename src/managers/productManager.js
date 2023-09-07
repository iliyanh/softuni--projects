const cubes = []
const uniqid = require("uniqid");

exports.getAll = (search, from, to) => {
    let result = cubes.slice()

    if(search){
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    if(from){
        result = result.filter(cube => cube.difficultyLevel >= from)
    }
    if(to){
        result = result.filter(cube => cube.difficultyLevel <= to)
    }
    return result
}
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