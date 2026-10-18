const { test, expect, request } = require('@playwright/test');
const {ApiUtils} = require('./utils/ApiUtils');
const loginPayLoad = { userEmail: "ashidhachu10@gmail.com", userPassword: "Achu@1998" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response;
test.beforeAll(async () => 
{
   const apiContext = await request.newContext();
   const apiUtils =new ApiUtils(apiContext,loginPayLoad);
   response =await apiUtils.createOrder(orderPayLoad);
   
});


//create order is success
test('@API Place the order', async ({ page }) => 
{

   await page.addInitScript(value => {

      window.localStorage.setItem('token', value)
   }, response.token);
   await page.goto('https://rahulshettyacademy.com/client');
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) 
   {
      const roworderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(roworderId)) 
      {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderDetails = await page.locator(".col-text").textContent();
   //await page.pause();
   expect(response.orderId.includes(orderDetails)).toBeTruthy();

});

//Verify if order created is showing  in history page
//
