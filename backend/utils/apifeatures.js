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
        // console.debug(querycopy);
        //remove some field for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete querycopy[key]);
        for (let key in querycopy) {
            if (key.includes("[")) {
                const [field, operator] = key.split(/\[|\]/).filter(Boolean);
                querycopy[field] = querycopy[field] || {};
                querycopy[field][operator] = querycopy[key];
                delete querycopy[key];
            }
        }
        // console.debug(querycopy);
        //filter for price and rating range
        let queryStr = JSON.stringify(querycopy);
        // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key) => `$${key}`);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        console.log("FINAL FILTER:", JSON.parse(queryStr));
        const parsed = JSON.parse(queryStr);

        for (let field in parsed) {
            if (typeof parsed[field] === "object") {
                for (let op in parsed[field]) {
                    parsed[field][op] = Number(parsed[field][op]);
                }
            }
        }


        this.query = this.query.find(parsed);
        // console.debug(queryStr);
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