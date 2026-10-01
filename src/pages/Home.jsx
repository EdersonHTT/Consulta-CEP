import React, { useState } from 'react'
import InfoCep from '../components/InfoCep'

function formatCep(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}

function Home() {
  const [cep, setCep] = useState(null)
  const [cepInput, setCepInput] = useState('')

  return (
    <div className='min-w-screen min-h-screen flex items-center justify-center'>
        
        <div className='max-w-150 min-w-100 w-2/4 h-80 bg-(--bg-default) border-2 border-(--border) p-10 flex rounded-xl justify-center gap-7'>
            <div className='h-full w-1/2 flex flex-col justify-evenly'>
                <h1 className='text-2xl text-center mb-10 font-semibold text-white'>Consulte seu Cep</h1>
                <input type="text" inputMode="numeric" maxLength={9} value={cepInput} onChange={(event) => setCepInput(formatCep(event.target.value))} className='placeholder:text-(--text-muted) text-white w-full py-2 px-3 text-xl rounded-lg border-2 border-(--border) hover:border-white focus:border-white outline-none' placeholder='00000-000'/>
                <button onClick={() => setCep(cepInput)} className='text-xl text-(--text) font-semibold rounded-xl w-full bg-(--secondary-color) p-2 hover:opacity-70 cursor-pointer'>Procurar</button>
            </div>
            <InfoCep cep={cep}/>
        </div>

    </div>
  )
}

export default Home