import logo from '../assets/logo.png'

export default function Header() {
    return (
        <header className="h-20 flex items-center justify-center border-b border-gray-200 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 sticky top-0 z-50 shadow-sm">
            <img className='h-16 w-16 mr-4' src={logo} alt="Galaxy's Pets Logo" />
            <h1 className=" text-4xl font-macondo">Galaxy's Pets</h1>
        </header>
    )
}