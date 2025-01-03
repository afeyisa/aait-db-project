# Bookstore Management System

This project is a Bookstore Management System that includes both a front-end and a back-end. 
The system allows users(book retailer) to manage books, employees, customers, and inventory.

## Project Structure

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/afeyisa/aait-db-project
    ```
    ```sh
    cd aait-db-project
    ```

2. Install dependencies for both front-end and back-end:
    ```sh
    cd back_end
    ```
    ```sh
    npm install
    ```
    ```sh
    cd ../front_end
    ```
    ```sh
    npm install
    ```

3. Set up the environment variables:
    - Create a `config.env` file in the [back_end](/back_end/) directory and add the necessary environment variables.

4. Set up the PostgreSQL database:
    - Run the SQL scripts in the [models](/back_end//models/) directory to create the necessary tables.

### Running the Application

1. Start the back-end server:
    ```sh
    cd back_end
    ```
    ```sh
    node index.js
    ```

2. Start the front-end development server:
    ```sh
    cd front_end
    ```
    ```sh
    npm start
    ```

### Building for Production

To create a production build of the front-end:
```sh
cd front_end
```
```sh
npm run build
```

## Project Details

### Back-End
The back-end is built using Node.js and Express.
Controllers handle various functionalities such as authentication, book management, customer management, etc.
Models interact with the PostgreSQL database.
Routes are defined in the router directory.

### Front-End
The front-end is built using React.
Components are located in the src/component directory.
Styles are located in the src/component/styles directory.

### License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.