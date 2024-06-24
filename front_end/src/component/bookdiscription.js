import { useEffect, useState } from "react";
import stackOfBooksImage from "../media/stack-of-books.png";
import './styles/description.css'
import { useNavigate } from 'react-router-dom';
import { useReadOnlyData } from "./inventory";
import { Link } from "react-router-dom";

const BookDiscription = () => {
    const [bookID,setBookId] = useState(useReadOnlyData());
    
  

    const  [book,setBook] =  useState([]);
    const navigate = useNavigate();

    const { title, author, isbn, genre, description, price, inventory_quantity,retail_quantity,total_quantity } = book;
    const [isFormVisible, setUpdateFormVisible] = useState(false);
    const [isDescriptionVisible, setDescriptionVisible] = useState(true);
    const [isMoveFormVisible,setMoveVisible] = useState(false);


    useEffect(() =>{
       
            // Format the URL with the query string
            const url = new URL('http://127.0.0.1:5000/bookDeteils');
            url.searchParams.append('isbn', bookID);
          
            // Options for the fetch request
            const options = {
              method: 'GET'
            };
          
            fetch(url, options)
            .then(response =>
            {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();}).then(data =>{
                    setBook(data);
                  }).catch (error=>{
                    console.log(error);
                  });
            
            },[]);
            
      


    const handleUpdate = () => {
        setUpdateFormVisible(true);
        setDescriptionVisible(false);
    }

    const handleMoveTOShelf =()=>{
        setMoveVisible(true);
        setDescriptionVisible(false);
    }


    const handleUpdateSummit = (e) => {
        e.preventDefault();
        // patch method

        // Here i would typically handle form submission, e.g., updating the book info
        setUpdateFormVisible(false);
        setDescriptionVisible(true);
    };
    const cancelUpdate =(e) =>{
        setUpdateFormVisible(false);
        setDescriptionVisible(true);
    };
    const handleMoveSummit = (e) => {
        e.preventDefault();
        //post method
        
        // Here i would typically handle form submission, e.g., moving the book from inventory to shelf
        setMoveVisible(false);
        setDescriptionVisible(true);
    };
    const cancelMove =(e)=>{
        setMoveVisible(false);
        setDescriptionVisible(true);
    };

    
    return (
        <div id="description-container">
            <div className="description-head"> 
                <img src={stackOfBooksImage} alt="book" />
                <h1>{title}</h1>
            </div>
            <div className={`descriptio-details ${isDescriptionVisible ? 'active' : ''}`}>
            <p>Author:&nbsp;{author}</p>
            <p>ISBN:&nbsp;{isbn}</p>
            <p>Genre:&nbsp;{genre}</p>
            <p style={{fontWeight: 'bold'}}>Price:&nbsp;${price}</p>
            <p>Quantity in Inventory:&nbsp;{inventory_quantity}</p>
            <p>Quantity in Retail:&nbsp;{retail_quantity}</p>
            <p>Total Quantity:&nbsp;{total_quantity}</p>
            <p>Description:&nbsp;{description}</p>


               <div> 
               <button style={{marginTop:'20px'}} type="button" className="go-back" onClick={() => navigate(-1)}>
                Go Back
              </button>
               
            
                </div>
            </div>

            






            
            <form 
            
            
                className={`update-book-info-form ${isFormVisible ? 'active' : ''}`} 
                onSubmit={handleUpdateSummit}
            >
                <div>
                <button 
                className="update-book-info-button"
                 >
                <Link to="/mover" className='add-button-link'> mover</Link> 
                </button>
                <button 
                className="update-book-info-button"
                onClick={handleUpdate} >
                Update Book Info
                </button>
                    <label>Title</label>
                    <input required type="text" name="title" defaultValue={title} />
                </div>
                <div>
                    <label>Author</label>
                    <input required type="text" name="author" defaultValue={author} />
                </div>
                <div>
                    <label>ISBN</label>
                    <input required type="text" name="isbn" defaultValue={isbn} />
                </div>
                <div>
                    <label>Genre</label>
                    <input required type="text" name="genre" defaultValue={genre} />
                </div>
                
                <div>
                    <label>Price</label>
                    <input required style={{height:"40px"}} type="number" name="price" defaultValue={price} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea id='textarea' required type="text" name="description" defaultValue={description} />
                </div>
                <div id="button-container">
                <button 
                type="button"
                className="go-back"
                onClick={cancelUpdate} >
                cancel
                </button>
                    <input type="submit" value="Submit" />
                </div>
            </form>

        </div>
    );
}

export default BookDiscription;