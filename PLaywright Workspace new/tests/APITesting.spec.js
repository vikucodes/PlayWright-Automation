import { test, expect, request } from '@playwright/test';

test.describe('API Testing Examples', () => {

    const baseURL = 'https://reqres.in/api';

    // GET Request
    test.only('GET Users', async ({ request }) => {

        const response = await request.get(`${baseURL}/users?page=2`);

        console.log(await response.json());

        expect(response.status()).toBe(200);
    });

    // POST Request
    test('Create User - POST', async ({ request }) => {

        const response = await request.post(`${baseURL}/users`, {
            data: {
                name: 'Vikas',
                job: 'QA Engineer'
            }
        });

        const responseBody = await response.json();

        console.log(responseBody);

        expect(response.status()).toBe(201);
        expect(responseBody.name).toBe('Vikas');
    });

    // PUT Request
    test('Update User - PUT', async ({ request }) => {

        const response = await request.put(`${baseURL}/users/2`, {
            data: {
                name: 'Vikas Updated',
                job: 'SDET'
            }
        });

        const responseBody = await response.json();

        console.log(responseBody);

        expect(response.status()).toBe(200);
    });

    // DELETE Request
    test('Delete User - DELETE', async ({ request }) => {

        const response = await request.delete(`${baseURL}/users/2`);

        console.log('Status Code: ', response.status());




        

        expect(response.status()).toBe(204);
    });

});



//paste API all content here class wise



}
)
