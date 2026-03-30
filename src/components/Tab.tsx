import { NavLink } from 'react-router-dom'
import sheltersLogo from '../assets/shelters_logo.svg'
import healthLogo from '../assets/health_logo.svg'
import nutritionLogo from '../assets/nutrition_logo.svg'
import BtnTab from './BtnTab'


export default function Tab() {

    return (
        <nav className="flex justify-around h-16 border-spacing-1 bg-white fixed bottom-0 w-[100%]">

            <NavLink to="/shelters" className="w-1/3 m-1 transition-all duration-200">
                {({ isActive }) => (
                    <BtnTab
                        logo={sheltersLogo}
                        text="Refuges"
                        color='blue'
                        active={isActive}
                    />
                )}
            </NavLink>

            <NavLink to="/health" className="w-1/3 m-1 transition-all duration-200">
                {({ isActive }) => (
                    <BtnTab
                        logo={healthLogo}
                        text="Santé"
                        color='emerald'
                        active={isActive}
                    />
                )}
            </NavLink>

            <NavLink to="/nutrition" className="w-1/3 m-1 transition-all duration-200">
                {({ isActive }) => (
                    <BtnTab
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

