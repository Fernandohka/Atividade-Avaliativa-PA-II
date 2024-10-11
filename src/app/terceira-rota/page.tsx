import Link from "next/link";
import { Suspense } from "react";

type IData = {
    items: {
        id: string,
        name: string,
    }[]
}

const TerceiraRota = async () => {
    const res = await fetch("https://dragonball-api.com/api/characters");
    const data:IData = await res.json();

    return (
        <div className="flex flex-col items-center">
            <h1>Terceira Rota</h1>
            <div className="flex flex-col gap-3 w-[300px] lg:w-[500px]">
                <Suspense fallback={<div>Loading...</div>}>
                    {data.items.map((item, index) => {
                        return(
                            <div key={index} className="border rounded border-black flex justify-between p-2">
                                <h2><b>{item.name}</b></h2>
                                <Link href={`/person/${item.id}`}>Ver Mais</Link>
                            </div>
                        )
                    })}
                </Suspense>
            </div>
        </div>
    )
}

export default TerceiraRota;