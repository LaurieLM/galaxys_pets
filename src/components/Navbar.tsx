import { useState } from 'react'
import refugesLogo from '../assets/refuges_logo.svg?raw'
import healthLogo from '../assets/health_logo.svg?raw'
import nutritionLogo from '../assets/nutrition_logo.svg?raw'
import BtnNavbar from './Btn_navbar'


export default function Navbar() {
    const [activeBtn, setActiveBtn] = useState('Refuges')

    return (
        <nav className="flex justify-around h-16 m-4 rounded-2xl border-spacing-1 shadow-[0px_1px_4px_0px_rgba(178,168,168,0.75)]">
            <BtnNavbar
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
            />
        </nav>
    )
}

