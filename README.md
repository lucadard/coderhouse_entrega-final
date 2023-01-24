### Notes:
Right now the server is hosted on [render.com](https://render.com), so you can try it out [here](https://ecommerce-coderhouse-server.onrender.com). Also I have a front end application wich uses it, here's the hosted [page](https://ecommerce-coderhouse-frontend.vercel.app/) and the [repo](https://github.com/lucadard/ecommerce-coderhouse_frontend).

# Overview
This [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) was developed as the final project for the Backend Programming Course from [Coderhouse](https://coderhouse.com). You make use of authentication and authorization, upload images and products, register users, fetch resources and more. And in this guide you are going to `learn how`. 

# Installation
You need to have [node](https://nodejs.org/) installed on your machine to run this program.

Clone this repository:
```bash
git clone https://github.com/lucadard/ecommerce-coderhouse_server
cd ecommerce-coderhouse_server
```
Install the dependencies
```bash
npm install
```
Run the start script
```bash
npm start
```
## Configuration
You WILL need to provide some environment variables, you can create a `.env` in the root folder:
```bash
NODE_ENV # Optional, setted as 'development' by default
PORT # Optional, uses 8080 by default
MONGO_DEV_URL # You don't need to set both
MONGO_PROD_URL
JWT_SECRET
EMAIL_SENDER_HOST
EMAIL_SENDER_USER
EMAIL_SENDER_PASS
```
The variables specified in that file are read by the object found in `/src/api/config/vars.js` which has a few more parameters that you can change. The most important is the named `admins`, you can manipulate the array to add or remove admin privileges to users with their email. 
```js
export const vars = {
  admins: ['admin@admin.com'],
  staticPath: {
    folder: 'static',
    url: '/public',
    defaultProductPicture: '/public/images/no-product-photo.webp'
  },
}
```

# Usage
# Authentication
This API uses [JWT](https://jwt.io/introduction) to authenticate requests with Bearer authentication. You will get your API Key making a POST request to the `/login` endpoint with your credentials as the body of the request, for example:

POST: `/login`
```json
{
    "email": "admin@admin.com",
    "password": "admin"
}
```
RETURNS: 
```ts
{ "token": string }
```

If you don't have and account you can signup making a `POST` request to the `/api/users` endpoint with the following required data:

POST: `/signup`
```json
{
    "email": "admin@admin.com",
    "password": "admin",
    "name": "Admin",
    "lastname": "Admin",
}
```
RETURNS: 
```ts
{ "id": string }
```

You can add an optional field named `image` with an image url string. 

To upload an image to the server you need to send a `multipart/form-data` request to the `/api/images` endpoint which returns a json object with the random generated image url path relative to the host, for example: 
```json
{ "url": "/public/images/abcdefg-12345.jpg" }
```

# Authorization
To access some endpoints you need to have admin rights which can be given manually editing the `vars.js` as it is explained before.

# Resources
## Products
The product object follows this pattern:
```ts
{
    "id": string,
    "name": string,
    "description": string,
    "price": number,
    "image": string
}
```

You can request for:
#### GET:
- `/api/products`: Returns an array with all the products.
- `/api/products/:id`: Returns the data of the product with the given ID.
#### POST: (needs admin authorization)
- `/api/products`: Adds a product, you need to specify the data in the body, returns a json object with his ID.
#### PUT: (needs admin authorization)
- `/api/products/:id`: Updates the product with the given ID, you need to specify the data in the body, returns a json object with his ID.
#### DELETE: (needs admin authorization)
- `/api/products/:id`: Removes the product with the given ID, returns a json object with his ID.

## Cart products
You need to append your token on every request.
#### GET:
- `/api/products`: Returns an array with the products on your cart which looks like this:
```ts
{
    "products": [
        {
        "prod": Product
        "cant": number
        }
    ]
}
```
#### POST:
- `/api/products/:id`: Adds the product with the given ID to your cart and returns your cart ID.
#### DELETE:
- `/api/products/:id`: Subtracts by one the product with the given ID from your cart and removes it if you have only one, returns your cart ID
## Orders
You need to append your token on every request.
#### GET:
- `/api/orders`: Returns an array with the orders you made which looks like this:
```ts
"orders": [
    { 
    "id": string,
    "clientId": string,
    "prods": [
        {
        "prod": Product
        "cant": number
        }
    ],
    "createdAt": Date
    }
],
```
#### POST:
- `/api/orders`: Creates a new order from your current cart (your cart cannot be empty).
# Errors
Every time the server throws an error the response will look something like this:
```json
{
    "success": false,
    "status": 404,
    "message": "Product not found.",
    "details": {
        "type": "Server Error"
    },
    "level": "error"
}
```
So you can retrieve the error message along with some details and the response status.


