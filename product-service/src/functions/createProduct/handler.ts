import {dBError, formatJSONError, formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {putElementIntoProduct, putElementIntoStocks} from "@libs/db-resolver";

const createNewProduct = async (event) => {
    console.log(event);
    const data = JSON.parse(event.body.products);
    if(!data.id) return formatJSONError({error: 'Product data is invalid'});
    return Promise.allSettled(data.map(item => [putElementIntoProduct(item), putElementIntoStocks(item)])).then(() => {
        return formatJSONResponse({statusCode: 200, body: JSON.stringify('Products added')});
    }, (err) => {
        return dBError({
            error: err.name
        })
    });
}

export const main = middyfy(createNewProduct);
