const express = require ('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next)=> {

    const product ={
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'Handling Post requests to /products',
        createdProduct: product
    });
});

router.get('/:productId', (req,res,next) =>{

    const id =req.params.productId;
    if(id == 'special'){
        res.status(200).json({
            message: 'you discovered the special ID',
            id: id
        });
    } else{
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req,res,next) =>{
        res.status(200).json({
            message: 'updated product'
        });
});

router.delete('/:productId', (req,res,next) =>{
    res.status(200).json({
        message: 'Delete product'
    });
});

module.exports=router;