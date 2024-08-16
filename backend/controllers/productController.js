import Product from "../models/Product.js"

const getProducts = async (req, res) => {
    try {
        const allProd=await Product.find();
        console.log(allProd);
    } catch (error) {
        console.log(error.message);
    }
}

export default getProducts;
