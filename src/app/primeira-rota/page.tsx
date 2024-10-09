"use client";

import Image from "next/image";
import { useEffect, useState, Suspense } from "react";

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
}

const PrimeiraRota = () => {
    const [characters, setCharacters] = useState<IData[]>([]);

    useEffect(() => {
        const api = async() => {
            const res = await fetch("https://dragonball-api.com/api/characters");
            const data = await res.json();
            setCharacters(data.items);            
        }
        api();
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-wrap justify-center p-2 gap-5">
                <div className="flex flex-wrap justify-center p-2 gap-5w-full lg:w-3/4">
                    {characters.map((item) => {
                        return(
                            <div key={item.id} className="w-[350px] border border-black rounded-md flex flex-col items-center p-2 gap-2">
                                <h2 className="text-3xl"><b>{item.name}</b></h2>
                                <div>
                                    <Image src={item.image} alt="character image" height={10000} width={10000} className="w-auto h-[300px]" priority={true}></Image>
                                </div>
                                <p className="text-justify"><b>Ki:</b> {item.ki}</p>
                                <p className="text-justify"><b>Ki Maximo:</b> {item.maxKi}</p>
                                <p className="text-justify"><b>Raça:</b> {item.race}</p>
                                <p className="text-justify"><b>Genero:</b> {item.gender}</p>
                                <p className="text-justify"><b>Descrição:</b> {item.description}</p>
                                <p className="text-justify"><b>Afiliação:</b> {item.affiliation}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Suspense>
    )
}

export default PrimeiraRota;