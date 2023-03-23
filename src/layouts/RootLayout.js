import { NavLink, Outlet } from "react-router-dom";
import './RootLayout.css';
 
const RootLayout = () => {
    return ( 
        <div>
            <h1 className="game-title">Match It</h1>
            <header>
                <nav className="nav-bar">
                    <h1><NavLink to='' className='link'>Home</NavLink></h1>
                    <h1><NavLink to='leaderboard' className='link'>LeaderBoard</NavLink></h1>
                </nav>
            </header>
            <Outlet />
        </div>
     );
}
 
export default RootLayout;