const { test, expect } = require('@playwright/test');

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

const credentails = { USER_EMAIL: "ashidhachu10@gmail.com", USER_PASSWORD: "Admin@12345" };

//login function
async function login(page) {
    page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(credentails.USER_EMAIL);
    await page.getByLabel('Password').fill(credentails.USER_PASSWORD);
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('Refund eligibility checking for single ticket', async ({ page }) => {
    await login(page);

    //Step 2 — Book first event with 1 ticket (default)

    //Navigate to /events
    await page.goto(`${BASE_URL}/events`);

    //Click Book Now on the very first event card 
    // (locate data-testid="event-card" → first → data-testid="book-now-btn")
    const eventcard = page.getByTestId('event-card').first();
    eventcard.getByTestId('book-now-btn').click();

    //Fill Full Name, Email (your email), Phone
    await page.getByLabel('Full Name*').fill('Sisin Saj');
    await page.locator('#customer-email').fill('sisin09@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+91 98760 67890');

    //Click confirm button (.confirm-booking-btn)
    await page.locator('.confirm-booking-btn').click();

    //Step 3 — Navigate to booking detail

    //Click View My Bookings link
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    //Assert URL is /bookings
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    //- Click the first View Details link
    const firstbooking = page.locator('#booking-card').first();
    firstbooking.getByRole('button', { name: 'View Details' }).click();
    //Assert: text Booking Information is visible on the page
    await expect(page.getByText("Booking Information")).toBeVisible();

    //Step 4 — Validate booking ref
    //Read booking ref from page
    const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
    // Read event title from h1
    const eventTitle = await page.locator('h1').innerText();
    //Assert validation : "first character of booking ref equals first character of event title"
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

    //Step 5 — Check refund eligibility
    //Click the Check Refund Eligibility button
    await page.locator('#check-refund-btn:visible').click();
    //Assert: spinner element (#refund-spinner) is immediately visible
    await expect(page.locator('#refund-spinner')).toBeVisible();
    //Assert: spinner is no longer visible within 6 seconds
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

    //Step 6 — Validate result
    //Locate result element by id #refund-result
    const refundresult = page.locator('#refund-result')
    //Assert it is visible
    await expect(refundresult).toBeVisible();
    //Assert it contains text Eligible for refund
    await expect(refundresult).toContainText('Eligible for refund.');
    await expect(refundresult).toContainText(' Single-ticket bookings qualify for a full refund.');
});

test('Refund eligibility checking for group ticket booking', async ({ page }) => {

    await login(page);


    //Navigate to /events
    await page.goto(`${BASE_URL}/events`);

    //Click Book Now on the very first event card 
    // (locate data-testid="event-card" → first → data-testid="book-now-btn")
    const eventcard = page.getByTestId('event-card').first();
    eventcard.getByTestId('book-now-btn').click();

    //increase the qauntity by 3
    await page.locator('button').filter({ hasText: '+' }).first().click();
    await page.locator('button').filter({ hasText: '+' }).first().click();

    //Fill Full Name, Email (your email), Phone
    await page.getByLabel('Full Name*').fill('Akshaya Anandan');
    await page.locator('#customer-email').fill('akshaya09@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+91 98760 12345');

    //Click confirm button (.confirm-booking-btn)
    await page.locator('.confirm-booking-btn').click();

    //Step 3 — Navigate to booking detail

    //Click View My Bookings link
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    //Assert URL is /bookings
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    //- Click the first View Details link
    const firstbooking = page.locator('#booking-card').first();
    firstbooking.getByRole('button', { name: 'View Details' }).click();
    //Assert: text Booking Information is visible on the page
    await expect(page.getByText("Booking Information")).toBeVisible();

    //Step 4 — Validate booking ref
    //Read booking ref from page
    const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
    // Read event title from h1
    const eventTitle = await page.locator('h1').innerText();
    //Assert validation : "first character of booking ref equals first character of event title"
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

    //Step 5 — Check refund eligibility
    //Click the Check Refund Eligibility button
    await page.locator('#check-refund-btn:visible').click();
    //Assert: spinner element (#refund-spinner) is immediately visible
    await expect(page.locator('#refund-spinner')).toBeVisible();
    //Assert: spinner is no longer visible within 6 seconds
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

    //Step 6 — Validate result
    //Locate result element by id #refund-result
    const refundresult = page.locator('#refund-result')
    //Assert it is visible
    await expect(refundresult).toBeVisible();
    //Assert it contains text  Not Eligible for refund
    await expect(refundresult).toContainText('Not eligible for refund.');
    await expect(refundresult).toContainText('Group bookings (3 tickets) are non-refundable.');
})