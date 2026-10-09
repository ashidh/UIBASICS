const {test,expect} =require("@playwright/test");

test('Playwright special locators',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Achu@1998");
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

    //5 Seconds default timeout for expect assertions --{timeout:10000} step level
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({timeout:10000});

    await page.getByRole('link', {name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole('button').click();

});

test('Playwright Test level time out',async({page})=>{

    //60 seconds timeout for this test
    test.setTimeout(60000);
    //Timeout for actions like click,fill etc
    page.setDefaultTimeout(9000);
    //timeout for all expect assertions in this test
    const slowExpect =expect.configure({timeout:9000});

    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Achu@1998");
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

    //5 Seconds default timeout for expect assertions --{timeout:10000} step level
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({timeout:10000});
    
    //Global levl->test level->step level
    //step level timeout for this action
    await page.getByRole('link', {name: 'Shop'}).click({timeout:15000});
    await slowExpect(page.locator("my-4").first()).toHaveText("Shop");
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole('button').click();

})
