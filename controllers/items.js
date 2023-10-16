const item = require('../models/item');


const getAllItems = async (req, res) => {
        
        const { category,name,sort,select, restaurantid} = req.query;
        const queryObject ={};
        queryObject.restaurantid = restaurantid;
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
         
        // pagination
        // let page = parseInt(req.query.page) || 1;
        // let limit = parseInt(req.query.limit) || 3;
        // let startIndex = (page - 1) * limit;
        // apiData = apiData.skip(startIndex).limit(limit);
        
        const items =await apiData;
        res.status(200).json({items, nbHits: items.length });

};

//get item by id
const getItemById = async (req, res) => {
        const { itemid: itemID } = req.params;
        const i = await item.findById(itemID);
        if(!i){
                return res.status(404).json({msg: `No item with id ${itemID}`});
        }
        res.status(200).json({i});
} 


const deleteItem = async (req, res) => {
        const { itemid: itemID } = req.params;
        const itemDeleted = await item.findByIdAndDelete(itemID);
        if(!itemDeleted){
                return res.status(404).json({msg: `No item with id ${itemID}`});
        }
        res.status(200).json({itemDeleted});
}

//delete all
const deleteAllItems = async (req, res) => {
        const queryObject ={};
        queryObject.restaurantid = req.query.restaurantid;
        const itemsDeleted = await item.deleteMany(queryObject);
        res.status(200).json({itemsDeleted});

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
        const { itemid: itemID } = req.params;
        const items = await item.updateOne({_id: itemID}, req.body);
        res.status(200).json({items});
}

const getAllItemsTesting = async (req, res) => {
        const items =await item.find(req.query).sort('rating price');
        res.status(200).json({items});   
};


 
module.exports = { getAllItems, getAllItemsTesting,addItem, addAllItems, updateItem,deleteItem , deleteAllItems,getItemById}; 

        