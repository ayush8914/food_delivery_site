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


const deleteItem = async (req, res) => {
        const { id: itemID } = req.params;
        const itemDeleted = await item.findByIdAndDelete(itemID);
        if(!itemDeleted){
                return res.status(404).json({msg: `No item with id ${itemID}`});
        }
        res.status(200).json({itemDeleted});
}

const addItem = async (req, res) => {
        const newItem = await item.create(req.body);
        res.status(201).json({newItem});
}

const addAllItems = async (req, res) => {
        const newItems = await item.insertMany(req.body);
        res.status(201).json({newItems});
}

//update item
const updateItem = async (req, res) => {
        const { id: itemID } = req.params;
        const items = await item.updateOne({_id: itemID}, req.body);
        res.status(200).json({items});
}

const getAllItemsTesting = async (req, res) => {
        const items =await item.find(req.query).sort('rating price');
        res.status(200).json({items});   
};
 
module.exports = { getAllItems, getAllItemsTesting,addItem, addAllItems, updateItem,deleteItem}; 

        