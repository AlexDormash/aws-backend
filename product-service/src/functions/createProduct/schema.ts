export default {
    type: "object",
    properties: {
        products: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {type: 'string'},
                    count: {type: 'number'},
                    description: {type: 'string'},
                    price: {type: 'number'},
                    title: {type: 'string'}
                }
            }
        }
    },
    required: ['products']
} as const;
