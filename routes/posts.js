const router = require('express').Router();
const verify = require('../verifyToken');

router.get('/',verify,(req,res)=>{
    // res.send("test");
    res.json({
        post:{
        title:"Post Title" ,
        desc:"Description of a post"
    }
});

});

module.exports = router;