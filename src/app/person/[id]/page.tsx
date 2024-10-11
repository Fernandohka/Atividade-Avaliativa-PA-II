import Image from "next/image";
import Link from "next/link";

interface IPerson {
    params: {
        id: string,
    }
}

interface IData {
    id: string,
    name: string,
    ki: string,
    maxKi: string,
    race: string,
    gender: string,
    description: string,
    image: string,
    affiliation: string,
    originPlanet: {
        name: string,
        isDestroyed: boolean,
        description: string,
        image: string,
    },
    transformations: {
        name: string,
        image: string,
        ki: string,
    }[]
}

const Person = async ({params: {id}} : IPerson) => {
    const res = await fetch(`https://dragonball-api.com/api/characters/${id}`);
    const data:IData = await res.json();

    return(
        <div className="flex justify-center p-3 gap-5 flex-col items-center">
            <div className="flex gap-3">
                {parseInt(id) - 1 >= 1 && <Link href={`/person/${parseInt(id) - 1}`}>Anterior</Link>}
                {parseInt(id) + 1 <= 35 && <Link href={`/person/${parseInt(id) + 1}`}>Próximo</Link>}
            </div>
            <div className="w-[300px] border border-black rounded-md flex flex-col items-center p-2 md:w-3/4">
                <h1 className="text-justify"><b>{data.name}</b></h1>
                <div>
                    <Image src={data.image} alt="character image" height={10000} width={10000} className="w-auto h-[300px]" priority={true}></Image>
                </div>
                <p className="text-justify"><b>Ki:</b> {data.ki}</p>
                <p className="text-justify"><b>Ki Maximo:</b> {data.maxKi}</p>
                <p className="text-justify"><b>Raça:</b> {data.race}</p>
                <p className="text-justify"><b>Genero:</b> {data.gender}</p>
                <p className="text-justify"><b>Descrição:</b> {data.description}</p>
                <p className="text-justify"><b>Afiliação:</b> {data.affiliation}</p>
            </div>
            <div className="w-[300px] border border-black rounded-md flex flex-col items-center p-2 md:w-3/4">
                <h1 className="text-justify"><b>Planeta Natal: {data.originPlanet.name}</b></h1>
                <div>
                    <Image src={data.originPlanet.image} alt="character image" height={10000} width={10000} className="w-[300px] h-auto" priority={true}></Image>
                </div>
                <p className="text-justify"><b>Status:</b> {data.originPlanet.isDestroyed ? "Destruido" : "Ok"}</p>
                <p className="text-justify"><b>Descrição:</b> {data.originPlanet.description}</p>
            </div>
            <div className="text-center md:w-3/4">
                {data.transformations[0] != undefined && 
                <h2><b>Transformações</b></h2>}
                <div className="flex flex-wrap gap-5 justify-center">
                    {data.transformations.map((item, index) => {
                        return(
                            <div key={index} className="w-[300px] border border-black rounded-md flex flex-col items-center p-2">
                                <h1 className="text-justify"><b>{item.name}</b></h1>
                                <div>
                                    <Image src={item.image} alt="character image" height={10000} width={10000} className="w-auto h-[300px]" priority={true}></Image>
                                </div>
                                <p className="text-justify"><b>Ki:</b> {item.ki}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Person;