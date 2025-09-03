class ApiFeatures {
    constructor(query,queryStr){
        this.query=query;
        this.queryStr = queryStr
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex: this.queryStr.keyword,
                $options : "i",
            },
        }:{};
        console.debug(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const querycopy = {...this.queryStr}
        console.debug(querycopy);
        //remove some field for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete querycopy[key]);
        console.debug(querycopy);
        //filter for price and rating range
        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);
        console.debug(querycopy);
        this.query = this.query.find(JSON.parse(queryStr));
        console.debug(queryStr);
        return this;
    }
    pagination(resultPerpage){
        const currentPage = Number(this.queryStr.page) || 1; 
        const skip = resultPerpage * (currentPage-1)
        this.query = this.query.limit(resultPerpage).skip(skip);
        return this;
    }
}
module.exports = ApiFeatures