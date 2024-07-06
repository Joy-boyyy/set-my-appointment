import {Link} from 'react-router-dom';
import './index.css';

const PrivateRoute=()=>{
return(

<nav className='navDiv'>
<div>
    <img className='logo' src='https://www.thoughtframeworks.com/wp-content/uploads/2022/01/TF-Logo-1.webp' alt='thoughtframeworks'/>
</div>
<div>
<ul className='headerUl'>

<Link to='/' className='linkRoute'>
<li>Home</li>
</Link>

<Link to='/appointment' className='linkRoute'>
<li>Appointment</li>
</Link>


<Link to='/Login' className='linkRoute'>
<li>SignIn</li>
</Link>

</ul>
</div>
</nav>

)

}

export default  PrivateRoute