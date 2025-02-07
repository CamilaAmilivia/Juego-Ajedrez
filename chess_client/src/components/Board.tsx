import { useState } from "react"
import { useApi } from "../hooks/useApi"

export function Board(){

    const {pieces} = useApi()

    const [squarePieces,setSquarePieces] = useState<{[key:string]: string | undefined }>({})

    const [squares, setSquares] = useState<JSX.Element[]>([])
    
    const rows = ['8', '7' , '6', '5', '4', '3', '2', '1']
    const colums = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    const setNewGame = () => {
        setSquarePieces({
            'a1': pieces?.WHITE.ROOK,
            'b1': pieces?.WHITE.KNIGHT,
            'c1': pieces?.WHITE.BISHOP,
            'd1': pieces?.WHITE.QUEEN,
            'e1': pieces?.WHITE.KING,
            'f1': pieces?.WHITE.BISHOP,
            'g1': pieces?.WHITE.ROOK,
            'h1': pieces?.WHITE.ROOK,
            'a2': pieces?.WHITE.ROOK,
            'b2': pieces?.WHITE.ROOK,
            'c2': pieces?.WHITE.ROOK,
            'd2': pieces?.WHITE.ROOK,
            'e2': pieces?.WHITE.ROOK,
            'f2': pieces?.WHITE.ROOK,
            'g2': pieces?.WHITE.ROOK,
            'h2': pieces?.WHITE.ROOK,
        })
    }

    return(
        <>
            <div style= {{display: 'flex', flexDirection: 'column', marginBottom: 20}}>
                {rows.map((row,index) => (
                    <div key={row} style= {{display: 'flex', flexDirection: 'row'}}>
                        {squares.slice(index * 8, (index + 1) * 8)}
                    </div>
                ))}
            </div>
        </>
    )
}