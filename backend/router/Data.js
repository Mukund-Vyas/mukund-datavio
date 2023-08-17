const express =  require('express');
const axios =  require('axios');
const cheerio =  require('cheerio');
const authUser =  require('../middleware/Authentication');
const Data =  require('../models/Data');

const router = express.Router();

router.post('/scrape',authUser,async(req,res)=>{
    try{
        const{url} = req.body;
        const data = await Data.findOne({
            userId:req.user,url
        });
        if(data){
            return res.status(200).json({msg:"data found",data});
        }else{
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            
            const title = $('.B_NuCI').text();
            const price = $('._30jeq3 _16Jk6d').text(); 
            const description = $('._1mXcCf RmoJUa').text();
            const rating_review = $('._2_R_DZ').text();
            const rating = $('._3LWZlK').text().trim();
            const media = $('._3GnUWp').text();
            // const mediaCount = media.find('._20Gt85 _1Y_A6W').length();
            console.log({title,
                price,
                description,
                rating_review,
                rating,
                });
            const data1 =await new Data({
                userId : req.user,
                title,
                price,
                description,
                rating_review,
                rating,            
                url
            });
            await data1.save();
            res.status(202).json({msg:'Data Scraped and saved',data1});
        }       
    }
    catch(error){
        res.status(500).json({msg:error.message});
    }
});

router.post('/retrive',authUser,async(req,res)=>{
    try{
        const{url} = req.body;
        

     }
     catch(error){
            res.status(500).json({msg:'Process failed'});
    }
});

module.exports = router;