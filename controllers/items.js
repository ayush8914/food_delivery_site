const item = require('../models/item');


const getAllItems = async (req, res) => {
        const { category,name,sort,select } = req.query;
        const queryObject ={};
        if(category){
             queryObject.category = category;
        }
        if(name){
                queryObject.name = { $regex: name, $options: 'i'};
                //case insensitive and partial match
        }

        let apiData = item.find(queryObject);
        if(sort){
             let sortFIx = sort.replace(","," ");
              apiData = apiData.sort(sortFIx);  
        }

        if(select){
                const selectFix = select.replace(","," ");
                apiData = apiData.select(selectFix);
        }
         
        //pagination
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 3;
        let startIndex = (page - 1) * limit;
        apiData = apiData.skip(startIndex).limit(limit);
        
        const items =await apiData;
        res.status(200).json({items, nbHits: items.length });
};

const getAllItemsTesting = async (req, res) => {
        const items =await item.find(req.query).sort('rating price');
        res.status(200).json({items});   
};
 
module.exports = { getAllItems, getAllItemsTesting}; 

        