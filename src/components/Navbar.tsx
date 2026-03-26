import { NavLink } from 'react-router-dom'
import sheltersLogo from '../assets/shelters_logo.svg'
import healthLogo from '../assets/health_logo.svg'
import nutritionLogo from '../assets/nutrition_logo.svg'
import BtnNavbar from './BtnNavBar'


export default function Navbar() {

    return (
        <nav className="flex justify-around h-16 m-4 rounded-2xl border-spacing-1 shadow-[0px_1px_4px_0px_rgba(178,168,168,0.75)] bg-white">

            <NavLink to="/shelters" className="w-1/3 m-1 transition-all duration-200">
                {({ isActive }) => (
                    <BtnNavbar
                        logo={sheltersLogo}
                        text="Refuges"
                        color='blue'
                        active={isActive}
                    />
                )}
            </NavLink>

            <NavLink to="/health" className="w-1/3 m-1 transition-all duration-200">
                {({ isActive }) => (
                    <BtnNavbar
                        logo={healthLogo}
                        text="Santé"
                        color='emerald'
                        active={isActive}
                    />
                )}
            </NavLink>

            <NavLink to="/nutrition" className="w-1/3 m-1 transition-all duration-200">
                {({ isActive }) => (
                    <BtnNavbar
                        logo={nutritionLogo}
                        text="Nutrition"
                        color='orange'
                        active={isActive}
                    />
                )}
            </NavLink>
        </nav>
    )
}

