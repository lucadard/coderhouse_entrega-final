# Installation
You need to have [node](https://nodejs.org/) installed on your machine.

Clone the repository and go to the folder:
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
# Usage
## Introduction
This [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) was developed as the final project for the Backend Programming Course from Coderhouse. You make use of authentication and authorization , upload images and products, register users, fetch resources and more. And in this guide you are going to `learn how`. 
## Authentication
This API uses JWT to authenticate requests. You will get your API Key making a POST request to the `/login` endpoint with your credentials as the body of the request, for example:

POST: `/login`
```json
{
    "email": "admin@admin.com",
    "password": "admin"
}
```
RETURNS: 
```json
{ "token": string }
```

If you don't have and account you can signup making a POST request to the `/api/users` endpoint with the following required data:

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
```json
{ "id": string }
```

You can add an optional field named "image" that needs to be a image url. You can upload one to the `/api/images` endpoint with returns a json object with the url.

## Authorization
To access some endpoints you need to have admin rights which can be given manually editing the vars.js file inside the src/config folder, look up for the key "admins" inside the "vars" exported variable, then you can manipulate the array.

## Resources
### Products
The product object follows this pattern:
```json
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
- `/api/products` --> returns an array with all the products 
- `/api/products/:id` --> returns the data of the product with the given ID
#### POST: (needs admin authorization)
- `/api/products` --> adds a product, you need to specify the data in the body, returns a json object with the id
#### PUT: (needs admin authorization)
- `/api/products/:id` --> updates the product with the given ID, you need to specify the data in the body, returns a json object with the id
#### DELETE: (needs admin authorization)
- `/api/products/:id` --> removes the product with the given ID, returns a json object with the id




