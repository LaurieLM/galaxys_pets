import { NavLink } from 'react-router-dom'
import refugesLogo from '../assets/refuges_logo.svg?raw'
import healthLogo from '../assets/health_logo.svg?raw'
import nutritionLogo from '../assets/nutrition_logo.svg?raw'
import BtnNavbar from './BtnNavBar'


export default function Navbar() {

    return (
        <nav className="flex justify-around h-16 m-4 rounded-2xl border-spacing-1 shadow-[0px_1px_4px_0px_rgba(178,168,168,0.75)]">
            {/* <BtnNavbar
                logo={refugesLogo}
                text="Refuges"
                color='blue'
                active={activeBtn === 'Refuges'}
                onClick={() => setActiveBtn('Refuges')}
            />
            <BtnNavbar
                logo={healthLogo}
                text="Santé"
                color='emerald'
                active={activeBtn === 'Santé'}
                onClick={() => setActiveBtn('Santé')}
            />
            <BtnNavbar
                logo={nutritionLogo}
                text="Nutrition"
                color='orange'
                active={activeBtn === 'Nutrition'}
                onClick={() => setActiveBtn('Nutrition')}
            /> */}

            <NavLink to="/refuges" className="w-1/3 m-1 transition-all duration-200">
                {({ isActive }) => (
                    <BtnNavbar
                        logo={refugesLogo}
                        text="Refuges"
                        color='blue'
                        active={isActive}
                    />
                )}
            </NavLink>

            <NavLink to="/sante" className="w-1/3 m-1 transition-all duration-200">
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

