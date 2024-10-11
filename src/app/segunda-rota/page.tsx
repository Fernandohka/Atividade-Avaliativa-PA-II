"use client";

import Image from "next/image";
import { useEffect, useState, Suspense } from "react";

import { api } from "../constants/api";

interface IDados {
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

const SegundaRota = () => {
    const [pagina, setPagina] = useState<string | undefined>("");
    const [nome, setNome] = useState<string | undefined>("");
    const [dados, setDados] = useState<IDados[]>([]);
    const [erroMsg, setErroMsg] = useState<string>("");

    useEffect(() => {
      setErroMsg("");
      if (nome != undefined && nome != "") {
        api.get(`/characters?name=${nome}`).then((res) => {
          if (dados[0] == undefined) {
            setErroMsg("Personagem não encontrado.");
          }
          setDados(res.data);
        })
      }
      else if (pagina != undefined && pagina != "") {
        api.get(`/characters?page=${pagina}`).then((res) => {
          if (dados[0] == undefined) {
            setErroMsg("Página não encontrada.");
          }
          setDados(res.data.items);
        })
      }
      else{
        api.get(`/characters`).then((res) => {
          if (dados[0] == undefined) {
            setErroMsg("Erro.");
          }
          setDados(res.data.items);
        })
      }
    
      
    }, [pagina, nome])

    return (
        <>
            <div className="flex justify-center flex-wrap gap-2 p-1">
              <input type="text" className="border border-black rounded gap-2 p-1" placeholder="Nome" value={nome} onChange={(e) => {setNome(e.target.value)}} />
              <input type="text" className="border border-black rounded gap-2 p-1" placeholder="Página" value={pagina} onChange={(e) => {setPagina(e.target.value)}} />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <div className="flex flex-wrap justify-center p-3 my-2 gap-5">
                <div className="flex flex-wrap justify-center p-2 gap-8 w-full lg:w-3/4">
                  {dados[0] == undefined && <p>{erroMsg}</p>}
                  {dados.map((item) => {
                    return (
                      <div key={item.id} className="w-[310px] border border-black rounded-md flex flex-col items-center p-2 gap-1 shadow-2xl">
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
        </>
    )
}

export default SegundaRota;