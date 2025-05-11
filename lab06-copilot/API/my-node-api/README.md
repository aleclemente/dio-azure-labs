# My Node API

This project is a simple Node.js API that retrieves address information based on postal codes using the Via CEP service.

## Features

- Retrieve address information by postal code.
- Built with Express.js for handling HTTP requests.
- Utilizes Axios for making HTTP requests to external APIs.

## Project Structure

```
my-node-api
├── src
│   ├── index.js               # Entry point of the application
│   ├── routes
│   │   └── postalCodeRoute.js  # Route definitions for postal code
│   ├── controllers
│   │   └── postalCodeController.js # Controller for handling postal code logic
│   └── services
│       └── viaCepService.js    # Service for interacting with the Via CEP API
├── package.json                # NPM configuration file
└── README.md                   # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-node-api
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Make a GET request to retrieve address information by postal code:
   ```
   GET /api/postalcode/:postalCode
   ```

   Replace `:postalCode` with the actual postal code you want to query.

## Example

To retrieve address information for the postal code `01001-000`, you would make a request to:
```
http://localhost:3000/api/postalcode/01001-000
```

## License

This project is licensed under the MIT License.