import logo from '../assets/logo.png'

export default function Header() {
    return (
        <header className="h-20 flex items-center justify-center bg-gradient-to-b from-slate-800 via-[#393666] to-slate-800 text-white">
            <img className='h-16 w-16 mr-4' src={logo} alt="Galaxy's Pets Logo" />
            <h1 className=" text-4xl font-macondo">Galaxy's Pets</h1>
        </header>
    )
}