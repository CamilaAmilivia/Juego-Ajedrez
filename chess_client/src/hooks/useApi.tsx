import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '../utils/constants';

export { useEffect, useState } from 'react';

type ChessPiece = {
    PAWN: string
    KNIGHT: string
    BISHOP: string
    ROOK: string
    QUEEN: string
    KING: string
}

type ChessPieces = {
    WHITE: ChessPiece
    BLACK: ChessPiece
}

export function useApi(){
    
    const [pieces , setPieces] = useState<ChessPieces>()

    useEffect(() => {
        getPieces()
    }, [])


    async function getPieces(){
        try{
           const res =  await fetch(API_URL + '/pieces', {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                }
           }) 

           const data = await res.json()
                if(res.status === 200){
                    setPieces(data)
                }

        }
        catch(err){
            toast.error(err as string)
            
        }
    }
}