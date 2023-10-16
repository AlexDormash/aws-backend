import {middyfy} from '@libs/lambda';
import {dBError, formatJSONResponse} from "@libs/api-gateway";
import {getProduct, getStocks, joinData} from "@libs/db-resolver";

const getProductList: any = async (event) => {
    console.log(event);
    return Promise.all([getProduct(), getStocks()]).then(([products, stocks]) => {
        const productList = joinData(products, stocks);
        return formatJSONResponse({
            response: productList
        });
    }, (err) => {
        return dBError({
            error: err.name
        })
    });
};
export const main = middyfy(getProductList);
