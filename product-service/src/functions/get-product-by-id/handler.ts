import {dBError, formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {getProduct, getStocks, joinData} from "@libs/db-resolver";

const getProductById: any = async (event) => {
    console.log(event);
    const id = event.pathParameters?.id;
    return Promise.all([getProduct(id), getStocks(id)]).then(([products, stocks]) => {
        const productList = joinData(products, stocks)[0];
        return formatJSONResponse({
            response: productList
        });
    }, (err) => {
        return dBError({
            error: err.name
        })
    });
};

export const main = middyfy(getProductById);
