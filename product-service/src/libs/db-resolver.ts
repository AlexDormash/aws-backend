const {DynamoDB} = require("aws-sdk")

const db = new DynamoDB.DocumentClient();
const productTableName = process.env.PRODUCT_TABLE_NAME;
const stocksTableName = process.env.STOCKS_TABLE_NAME;

export const getProduct: any = async (id?: string) => {
    let params, product;

    if (id) {
        params = getParams('getProductById', id);
        product = await db
            .query(params)
            .promise();
    } else {
        params = getParams('getProduct', id);
        product = await db
            .scan(params)
            .promise();
    }
    return product.Items;
}
export const getStocks: any = async (id?: any) => {
    let params, stocks;
    if (id) {
        params = getParams('getStockById', id);
        stocks = await db
            .query(params)
            .promise();
    } else {
        params = getParams('getStocks', id);
        stocks = await db
            .scan(params)
            .promise();
    }

    return stocks.Items;
}

export const putElementIntoProduct: any = async (item: any) => {
    const params = getParams('putElementIntoProduct');
    params.Item = {
        id: item.id,
        description: item.description,
        price: item.price,
        title: item.title
    };

    return await db
        .put(params)
        .promise();
};
export const putElementIntoStocks: any = async (item: any) => {
    const params = getParams('putElementIntoStocks');
    params.Item = {
        product_id: item.id,
        count: item.count,
    }

    return await db
        .put(params)
        .promise();
};

const getParams: any = (query: string, id?: string) => {
    switch (query) {
        case 'getProduct':
            return {
                TableName: productTableName
            };
        case 'getStocks':
            return {
                TableName: stocksTableName
            };
        case 'getProductById':
            return {
                KeyConditionExpression: 'id = :id',
                ExpressionAttributeValues: {
                    ':id': id
                },
                TableName: productTableName
            };
        case 'getStockById':
            return {
                KeyConditionExpression: 'product_id = :id',
                ExpressionAttributeValues: {
                    ':id': id
                },
                TableName: stocksTableName
            };
        case 'putElementIntoProduct':
            return {
                TableName: productTableName,
                Item: {},
            };
        case 'putElementIntoStocks':
            return {
                TableName: stocksTableName,
                Item: {},
            };
    }
}

export const joinData: any = (products: any, stocks: any) => {
    return products.map(item => {
        item.count = stocks.find(count => {
            return count.product_id === item.id;
        }).count || '';
        return {
            ...item,
        }
    });
}