/* thank you  lord Jesus Christ  for every thing🙏🙏🙏 */
/* author Feyisa kenenisa */

const authControllers = require('../Controllers/authController');
const inv_controller  = require('../Controllers/invController');
const bookController  = require('../Controllers/bookController');
const userController  = require('../Controllers/userController');
const retailController = require('../Controllers/retailController');
const navigationController = require('../Controllers/navigationController');
const employeeController = require ('../Controllers/employeeController');
const sellBooksController = require('../Controllers/sellBooksController');
const customerController = require('../Controllers/customerController');
const rentController =     require('../Controllers/rentController');
const express         = require('express');
const path            = require('path');
const cors            = require('cors');
const bodyParser      = require('body-parser');


const routeTo      = express.Router();

routeTo.use(cors());
routeTo.use(express.json());
routeTo.use(bodyParser.urlencoded({extended: true}));
routeTo.use(express.static(path.join(__dirname,'../public')));
routeTo.use(express.static(path.join(__dirname,'../public/build')))


// routing
routeTo.
route('/')
.get(navigationController.root);
routeTo
.route('/home')
.get(navigationController.home);
//registration
routeTo
.route('/register')
.post(userController.createUser);
//.get(authControllers.register);

//user authorization
routeTo
.route('/login')
.post(authControllers.authenticate)
.get(navigationController.login);
//to ward hidden page
routeTo
.route('/mybookstore')
.get(navigationController.bookStore);


 // inserting new book information to book table and its location to invetory table
routeTo
.route('/newbook')
.post(inv_controller.addNewBook);

 // search in inventory by title
 routeTo
 .route('/searchinvbytitle')
 .get(inv_controller.getBookByTitle);

 // search in inventory by author
 routeTo
 .route('/searchinvbyauthor')
 .get(inv_controller.getBookByAuthor);

// search in invetory by isbn
routeTo
.route('/searchinvbyisbn')
.get(inv_controller.getBookByIsbn);

// resock
routeTo
.route('/restock')
.post(inv_controller.reStock);


routeTo
.route('/bookDeteils')
.get(bookController.bookdeteils);

routeTo
.route('/updatebook')
.patch(bookController.updateBookInfo);

routeTo
.route('/mover')
.post(bookController.moveBookTOshelf);





routeTo
 .route('/searchretailbytitle')
 .get(retailController.getBookByTitle);

 // search in inventory by author
 routeTo
 .route('/searchretaibyauthor')
 .get(retailController.getBookByAuthor);

// search in invetory by isbn
routeTo
.route('/searchretaibyisbn')
.get(retailController.getBookByIsbn);


// employee /hire /fire /checkpayment /employeedateail


 routeTo
 .route('/hire')
 .post(employeeController.hire);

 routeTo
 .route('/fire')
 .post(employeeController.fire);

 routeTo
 .route('/checkpayment')
 .post(employeeController.checkPayment);
 routeTo
 .route('/employeedateail')
 .post(employeeController.getEmployeeDetail);

 routeTo
 .route('/pay')
 .post(employeeController.pay);

 routeTo
 .route('/booksell')
 .post(sellBooksController.sellBook);



 //customer
 routeTo
 .route('/newcustomer')
 .post(customerController.createCustomerController);

 routeTo
 .route('/updatecustomer')
 .post(customerController.updateCustomerController);

 routeTo
 .route('/getcustomer')
 .get(customerController.getCustomerByIdController);


 routeTo
 .route('/customers')
 .get(customerController.getCustomerList);


//rent
 routeTo
 .route('/getrents')
 .get(rentController.getAllRents);
 routeTo
 .route('/createrent')
 .post(rentController.createRentController);

 routeTo
 .route('/return')
 .post(rentController.returnRentedBookController);

module.exports = routeTo;

