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


//file name >POST_api_Request01_createBooking.spec.ts

/*
Test: create booking
Request Type: Post
Request body :static

*/

import {test,expect} from"@playwright/test"

test("Create Post Request using static body" ,async ({request})=>{

//request body

const requestBody={
"firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 1000,
    "depositpaid" : true,
    "bookingdates" : {
      "checkin":"25-07-01",
        "checkout" : "25-07-05"
    },
    "additionalneeds" : "super bowls"

}
//send post request
const response=await request.post("https://restful-booker.herokuapp.com/booking" ,{data:requestBody})

const responseBody=await response.json()
console.log(responseBody)

//validate status

await expect(response.ok()).toBeTruthy();
await expect (response.status()).toBe(200);

//Validate response body
await expect(responseBody).toHaveProperty("bookingid");
await expect(responseBody).toHaveProperty("booking");
await expect(responseBody).toHaveProperty("bookings.additionalneeds");

//validate booking details
//we use json path finder for path 
const booking=responseBody.booking

await expect(responseBody.booking).toMatchObject({
    
    firstname : "Jim",
    lastname : "Brown",
    totalprice: 1000,
    depositpaid : true,
    additionalneeds : "super bowls"

});

await expect(booking.bookingdates).toMatchObject({

 checkin:"25-07-01",
        checkout : "25-07-05"


})
}
)


//file name >POST_api_Request02_createBooking.spec.ts

/*
Test: create booking
Request Type: Post
Request body :static

*/

import {test,expect} from"@playwright/test"
import fs from 'fs';

test("Create Post Request using json file" ,async ({request})=>{

//read data from json(requet body)
const jsonFile="testdata/post_request_body.json";
const requestBody = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));


//send post request
const response=await request.post("https://restful-booker.herokuapp.com/booking" ,{data:requestBody})

const responseBody=await response.json()
console.log(responseBody)

//validate status

await expect(response.ok()).toBeTruthy();
await expect (response.status()).toBe(200);

//Validate response body
await expect(responseBody).toHaveProperty("bookingid");
await expect(responseBody).toHaveProperty("booking");
await expect(responseBody).toHaveProperty("booking.additionalneeds");

//validate booking details
//we use json path finder for path 
const booking=responseBody.booking

await expect(responseBody.booking).toMatchObject({
    
    firstname :requestBody.firstname ,
    lastname : requestBody.lastname,
    totalprice: requestBody.totalprice,
    depositpaid : requestBody.depositpaid,
    additionalneeds :requestBody.additionalneeds

});
//validate booking dates(nested json object)
await expect(booking.bookingdates).toMatchObject({

 checkin:requestBody.bookingdates.checkin,
        checkout : requestBody.bookingdates.checkout


})
}
)

//File Name > POST_api_Request_using_faker_createBooking.spec.ts


/*
Test: create booking
Request Type: Post
Request body :Random or dynamic data(using faker)

*/
//install faker from terminal by sending
//npm install @faker-json/faker

//install Luxon > it is a library for working with dates and times in js
//npm install luxon

import {test,expect} from"@playwright/test"
import {faker} from "@faker-js/faker"
import{DateTime} from "luxon"

test("Create Post Request using faker " ,async ({request})=>{

    //data generation using faker library

    const firstname=faker.person.firstName();
    const lastname=faker.person.lastName();
    const totalprice=faker.number.int({min:100 ,max:5000})
    const depositid=faker.datatype.boolean();
    const checkin=DateTime.now().toFormat("yyyy-MM-dd");
    const checkout=DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd")
    const additionalneeds="super bowls"


//request body

const requestBody={
    firstname:firstname,
    lastname:lastname,
    totalprice:totalprice,
    depositid:depositid,
    bookingdates:{
        checkin:checkin,
        checkout:checkout,
    },
    additionalneeds:additionalneeds



}
//send post request
const response=await request.post("https://restful-booker.herokuapp.com/booking" ,{data:requestBody})

const responseBody=await response.json()
console.log(responseBody)

//validate status

await expect(response.ok()).toBeTruthy();
await expect (response.status()).toBe(200);

//Validate response body
await expect(responseBody).toHaveProperty("bookingid");
await expect(responseBody).toHaveProperty("booking");
await expect(responseBody).toHaveProperty("bookings.additionalneeds");

//validate booking details
//we use json path finder for path 
const booking=responseBody.booking

await expect(responseBody.booking).toMatchObject({
    
     firstname :requestBody.firstname ,
    lastname : requestBody.lastname,
    totalprice: requestBody.totalprice,
    depositpaid : requestBody.depositid,
    additionalneeds :requestBody.additionalneeds

});

await expect(booking.bookingdates).toMatchObject({

  checkin:checkin,
        checkout:checkout,


})
}
)
