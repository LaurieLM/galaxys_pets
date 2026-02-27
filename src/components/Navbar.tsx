import refugesLogo from '../assets/refuges_logo.svg'
import healthLogo from '../assets/health_logo.svg'
import nutritionLogo from '../assets/nutrition_logo.svg'
import BtnNavbar from './Btn_navbar'


export default function Navbar() {
    return (
        <nav className="flex justify-around h-16 m-4 rounded-2xl border-spacing-1 shadow-[0px_1px_4px_0px_rgba(178,168,168,0.75)]">
            <BtnNavbar logo={refugesLogo} text="Refuges" />
            <BtnNavbar logo={healthLogo} text="Santé" />
            <BtnNavbar logo={nutritionLogo} text="Nutrition" />
        </nav>
    )
}

