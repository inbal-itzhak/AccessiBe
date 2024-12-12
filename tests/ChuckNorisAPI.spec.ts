import { test, expect } from '@playwright/test';

test('Get Chuck Noris Joke', async({page}) =>{
    const mockResponse = {
        "categories": [],
        "created_at": "2020-01-05 13:42:30.177068",
        "icon_url": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
        "id": "Xr51Ho8XS5Splj6XN9ChCQ",
        "updated_at": "2020-01-05 13:42:30.177068",
        "url": "https://api.chucknorris.io/jokes/Xr51Ho8XS5Splj6XN9ChCQ",
        "value": "Harry potter is Chuck Norris's love child"
      };
    
      await page.route('https://api.chucknorris.io/jokes/Xr51Ho8XS5Splj6XN9ChCQ', async (route) => {
        await route.fulfill({
          status: 200,
          json: mockResponse
        });
      });
    
      const response = await page.request.get('https://api.chucknorris.io/jokes/Xr51Ho8XS5Splj6XN9ChCQ');
      const responseData = await response.json();
      expect(responseData.value).toBe(mockResponse.value);
})