import './styles/navigation.css';
import { Link } from 'react-router-dom';

const Navigation =() =>{
    return (
        <nav className="nav">
            <ul>
                <li>
                    <button className='nav-button'>
                        <Link to="/">Inventory</Link> 
                    </button>
                </li>
                <li>
                    <button className='nav-button'>
                        <Link to="/employee">Employee</Link> 
                    </button>
                </li>
                <li>
                    <button className='nav-button'>
                        <Link to="/retail">Retail Area</Link> 
                    </button>
                </li>
                <li>
                    <button className='nav-button'>
                        <Link to="/custpage">Customers</Link> 
                    </button>
                </li>
                
                
            </ul>
        </nav>
    );
}

export default Navigation;
