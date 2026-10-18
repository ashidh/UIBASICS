const {test,expect}=require('@playwright/test');

test("Popup validations",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com");
    //await page.goBack();
    //await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.on('dialog',dialog=> dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    const framespage = page.frameLocator('#courses-iframe');
    await framespage.getByRole('link', { name: 'NEW All Access plan' }).click();
    const textcheck=await framespage.getByRole('heading', { name: 'Join 13,522 Happy Subscibers!' }).textContent();
    console.log(textcheck.split(" ")[1]);
})