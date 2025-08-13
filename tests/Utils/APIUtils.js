class APIUtils
{
    constructor(apicontext,payload)
    {
        this.apicontext=apicontext;
        this.payload=payload;
    }

    async getToken()
    {
        const loadapi=await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.payload
            })
            const loginresponsejson=await loadapi.json();
            const token=loginresponsejson.token;
            console.log(token);
            return token;
    }

    async createorder(orderpayload)
    {
        let response={};
        response.token=await this.getToken();
        const orderResponse=await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data:orderpayload,
                headers:{
                    'Authorization':response.token, 
                    'content-type':'application/json'
                }
            })
        
            const orderResponseJson=await orderResponse.json();
            console.log(orderResponseJson)
            const orderId=await orderResponseJson.orders[0];
            response.orderId=orderId;
            console.log(response.orderId);

            return response;
    }

}
module.exports = {APIUtils};