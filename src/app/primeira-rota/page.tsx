"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
        <div className="flex flex-wrap justify-center p-2 gap-5">
            {characters.map((item) => {
                return(
                    <div key={item.id} className="w-[300px] border border-black rounded-md flex flex-col items-center p-2">
                        <h2>{item.name}</h2>
                        <div>
                            <Image src={item.image} alt="character image" height={10000} width={10000} className="w-auto h-[300px]" priority={true}></Image>
                        </div>
                        <p className="text-justify">Ki: {item.ki}</p>
                        <p className="text-justify">Ki Maximo: {item.maxKi}</p>
                        <p className="text-justify">Raça: {item.race}</p>
                        <p className="text-justify">Genero: {item.gender}</p>
                        <p className="text-justify">Descrição: {item.description}</p>
                        <p className="text-justify">Afiliação: {item.affiliation}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default PrimeiraRota;