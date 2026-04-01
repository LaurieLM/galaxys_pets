import AnimalCard from "../components/AnimalCard"

export default function Home() {

    return (
        <section>
            <div className="my-4 mx-8">
                <h1 className="text-[2.5rem] text-center text-[#8fd3a9] font-bold">Bienvenue sur Galaxy's Pets !</h1>
                <p className="mt-4 text-[1.1rem] text-center text-slate-300 font-thin ">Découvre tout ce qu'il faut savoir pour prendre soin de ton animal de compagnie.</p>
            </div>
            <div>
                <h2 className="text-[1.5rem] text-center text-[#8fd3a9] font-bold mt-8">Choisis un type d'animal pour commencer :</h2>
                <AnimalCard/>
            </div>
        </section>
    )
}