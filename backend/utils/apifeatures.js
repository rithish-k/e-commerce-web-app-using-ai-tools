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
        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const querycopy = {...this.queryStr}
        console.log(querycopy);
        //remove some field for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete querycopy[key]);
        console.log(querycopy);
        this.query = this.query.find(querycopy);
        return this;



    }
}
module.exports = ApiFeatures