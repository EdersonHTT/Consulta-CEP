import React, { useEffect, useState } from 'react'

function InfoCep({ cep }) {
  const [data, setData] = useState(null) 
  const [loading, setLoading] = useState(null) 
  const [erro, setErro] = useState(null)

  useEffect(() => {
    if (!cep) return;

    setErro(null);
    setData(null);
    setLoading("Carregando...");
    cepHandler(cep);

  }, [ cep ]);

  async function cepHandler(cep) {
      const numeroCep = cep.replace(/\D/g, "");

      if (!/^\d{8}$/.test(numeroCep)) {
        setData(null);
        setLoading(null);
        setErro("Digite um CEP válido com 8 dígitos.");
        return;
      }

      try {
        const res = await fetch(`https://viacep.com.br/ws/${numeroCep}/json/`);
        const dataRes = await res.json();

        if (!res.ok || dataRes.erro) {
          throw new Error("CEP não encontrado.");
        }

        setLoading(null);
        setErro(null);
        setData(dataRes);
      } catch(e) {
        setLoading(null);
        setErro("Erro ao carregar Cep: " + e.message);
        setData(null);
      }
  }

  return (
    <div className={`${cep? "w-1/2" : "w-none"} h-full flex items-center justify-center`}>
      {
        loading
          ? (<h2 className='text-lg text-(--text) text-center'>{loading}</h2>) : ""
      }
      {
        data? (
            <div className='flex flex-col justify-around h-full py-6'>
                <p className='text-lg text-(--text)'><span className='font-semibold'>Cidade: </span>{data.localidade}</p> 
                <p className='text-lg text-(--text)'><span className='font-semibold'>Rua: </span>{data.logradouro}</p> 
                <p className='text-lg text-(--text)'><span className='font-semibold'>Bairro: </span>{data.bairro}</p> 
                <p className='text-lg text-(--text)'><span className='font-semibold'>Estado: </span>{data.estado}</p> 
                <p className='text-lg text-(--text)'><span className='font-semibold'>Região: </span>{data.regiao}</p> 
            </div>
          ) : ""
      }
      {
        erro
          ? (<h2 className='text-lg text-(--text) text-center'>{erro}</h2>) : ""
      }
    </div>
  )
}

export default InfoCep