const {test, expect} = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
//credentials
const USER_EMAIL = 'ashidhachu10@gmail.com';
const USER_PASSWORD = 'Admin@12345';

async function login(page) {

  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
  await page.getByLabel('Password').fill(USER_PASSWORD);
  await page.locator("#login-btn").click();
  await expect (page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('create event via UI, book it, and verify seat reduction', async ({ page }) => {

    // Step 1: Log in
  await login(page);

  // Step 2: Create a new event via the admin form
    await page.goto(`${BASE_URL}/admin/events`);
  // Unique title so we can find this exact card later
  const eventtitle =`Playwright EVENT ${Date.now()}`;

  // Located by id (explicit on the component)
  await page.locator('#event-title-input').fill(eventtitle);

    // Description — only textarea in the form
  await page.getByPlaceholder('Describe the event…').fill('Playwright Test Event');

  // Located by label (Select auto-generates id from label text)
  await page.getByLabel('Category*').selectOption('Conference');
  await page.getByLabel('City*').fill('KOCHI');
  await page.getByLabel('Venue*').fill('CARNIVAL INFOPARK');

  // datetime-local input — located by label
  await page.getByLabel('Event Date & Time*').fill('2027-12-31T10:00');

  //price and total seats located by label
  await page.getByLabel('Price ($)*').fill('100');
  await page.getByLabel('Total Seats*').fill('150');

  //add event button located by label
  await page.locator('#add-event-btn').click();
  // Wait for success toast
  await expect(page.getByText('Event created!')).toBeVisible();

  console.log(`Created event: "${eventtitle}"`);

  // Step 3:Go to event page and find the newly created card
  await page.goto(`${BASE_URL}/events`);

  //located by test id
  const eventCard =page.getByTestId('event-card');

  //Assert the first card is visible (confirms page loaded)
  await expect(eventCard.first()).toBeVisible();

  //From all cards, filter for the one that contains your event title text
  const targetCard =eventCard.filter({hasText: eventtitle}).first();
  //Assert the matched card is visible (timeout 5 seconds)
  await expect(targetCard).toBeVisible({timeout:5000});

  //Read the seat count text from that card 
  //(locate element containing text seat, parse integer from its inner text)
  // store this as seatsBeforeBooking
  const seatsBeforeBooking =parseInt(await targetCard.getByText('seat').first().innerText());
  console.log(`Seats before booking : "${seatsBeforeBooking}"`);

  //locate book now button by testid
  await targetCard.getByTestId('book-now-btn').click();

  //step -Fill booking form
  const ticketcount =page.locator('#ticket-count')
  //assert the ticketcount default number as 1
  await expect(ticketcount).toHaveText('1');
  //Fill Full Name (locate by label Full Name)
  await page.getByLabel('Full Name*').fill('Sisin Saj');
  //Fill Email (locate by id #customer-email)
  await page.locator('#customer-email').fill('sisin09@gmail.com');
  //Fill Phone (locate by placeholder +91 98765 43210)
  await page.getByPlaceholder('+91 98765 43210').fill('+91 98760 67890');
  //Click the confirm button (locate by CSS class .confirm-booking-btn)
  await page.locator('.confirm-booking-btn').click();

  //Step 6 — Verify booking confirmation
  //- Locate the booking reference element (locate by CSS class .booking-ref, take .first())
  const bookingref1= page.locator('.booking-ref').first();
  //Assert it is visible
  await expect(bookingref1).toBeVisible();
  //Read its inner text, trim it — store as bookingRef
  const bookingref=(await bookingref1.innerText()).trim();
  console.log(`Booking confirmed : ${bookingref}`);

  //Step 7 — Verify in My Bookings
  //Click the link View My Bookings
  await page.getByRole('link',{name:'View My Bookings'}).click();
  //Assert: URL is BASE_URL/bookings
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  //Get all booking cards (locate by id #booking-card)
  const bookingcards=page.locator('#booking-card')
  //Assert the first booking card is visible
  await expect(bookingcards.first()).toBeVisible();

  //Filter booking cards for the one that contains an element with 
  // class .booking-ref matching your bookingRef text
  const matchingcard=bookingcards.filter({has:page.locator('.booking-ref',{hasText:bookingref})});
  //Assert that matched card is visible
  await expect(matchingcard).toBeVisible();

  //Assert that matched card contains your eventTitle text
  await expect(matchingcard).toContainText(eventtitle);

  //Step 8 — Verify seat reduction
  //Navigate back to /events
  await page.goto(`${BASE_URL}/events`);
  //Assert the first event card is visible
  await expect(eventCard.first()).toBeVisible();
  //Filter cards again using hasText: eventTitle
  const UpdatedCard=eventCard.filter({hasText:eventtitle}).first();
  //Read the seat count text again (same as Step 3) — store as seatsAfterBooking
  const seatafterBooking =parseInt(await targetCard.getByText('seat').first().innerText());
  console.log(`Seats after booking : "${seatafterBooking}"`);

  //Assert: seatsAfterBooking === seatsBeforeBooking - 1
  expect(seatafterBooking).toBe(seatsBeforeBooking-1);






 
  





  




});

