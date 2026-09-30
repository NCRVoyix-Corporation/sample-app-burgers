import { test } from '#testkit/functions/application/burger/testFixtures';
import { loadTestDataFile } from '#testkit/functions/application/burger/adapters/testData.adapter';
import * as burger from '#testkit/functions/application/burger/burger';
import { TestData } from '#testkit/types/TestData/test-data-burger';

test.beforeEach(async ({ page, restaurantSampleAppUrl }) => {
    await page.goto(restaurantSampleAppUrl);
});

test('Restaurant Sample App - Sanity', async ({ page }) => {
    const midtown = loadTestDataFile<TestData.Location>('location', 'midtown.json');
    const highland = loadTestDataFile<TestData.Location>('location', 'highland.json');
    const southland = loadTestDataFile<TestData.Location>('location', 'southland.json');

    await burger.verifyHeaderBar(page);

    await burger.selectLocation(page, midtown);
    await burger.verifyLocationSelected(page, midtown);

    await burger.changeLocation(page, highland);
    await burger.verifyLocationSelected(page, highland);

    await burger.changeLocation(page, southland);
    await burger.verifyLocationSelected(page, southland);
});
