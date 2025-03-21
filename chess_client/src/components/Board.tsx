import { JSX, useContext, useEffect, useState } from "react"
import { useApi } from "../hooks/useApi"
import { Square } from "./Square"
import { MoveContext } from "../contexts/Move_Provider"
import toast from "react-hot-toast"


export function Board(){

    const { fromSquare, toSquare} = useContext(MoveContext)

    const {pieces, makeMove, newGame} = useApi()

    const [squarePieces,setSquarePieces] = useState<{[key:string]: string | undefined }>({})

    const [squares, setSquares] = useState<JSX.Element[]>([])
    
    const rows = ['8', '7' , '6', '5', '4', '3', '2', '1']
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    const setNewGame = () => {
        setSquarePieces({
            'a1': pieces?.WHITE.ROOK,
            'b1': pieces?.WHITE.KNIGHT,
            'c1': pieces?.WHITE.BISHOP,
            'd1': pieces?.WHITE.QUEEN,
            'e1': pieces?.WHITE.KING,
            'f1': pieces?.WHITE.BISHOP,
            'g1': pieces?.WHITE.PAWN,
            'h1': pieces?.WHITE.PAWN,
            'a2': pieces?.WHITE.PAWN,
            'b2': pieces?.WHITE.PAWN,
            'c2': pieces?.WHITE.PAWN,
            'd2': pieces?.WHITE.PAWN,
            'e2': pieces?.WHITE.PAWN,
            'f2': pieces?.WHITE.PAWN,
            'g2': pieces?.WHITE.PAWN,
            'h2': pieces?.WHITE.PAWN,
            'a8': pieces?.BLACK.ROOK,
            'b8': pieces?.BLACK.KNIGHT,
            'c8': pieces?.BLACK.BISHOP,
            'd8': pieces?.BLACK.QUEEN,
            'e8': pieces?.BLACK.KING,
            'f8': pieces?.BLACK.BISHOP,
            'g8': pieces?.BLACK.KNIGHT,
            'h8': pieces?.BLACK.ROOK,
            'a7': pieces?.BLACK.PAWN,
            'b7': pieces?.BLACK.PAWN,                    
            'c7': pieces?.BLACK.PAWN,
            'd7': pieces?.BLACK.PAWN,
            'e7': pieces?.BLACK.PAWN,
            'f7': pieces?.BLACK.PAWN,                      
            'g7': pieces?.BLACK.PAWN,
            'h7': pieces?.BLACK.PAWN,       
         })
    }

    useEffect(() =>{
        if (pieces) setNewGame()
    }, [pieces])

    useEffect(() =>{
        setSquares(rows.flatMap(row =>
            columns.map(column => {
                    return(
                        <Square 
                            key={`${column}${row}`}
                            name={`${column}${row}`}
                            color={(row.charCodeAt(0) + column.charCodeAt(0)) % 2 === 0 ? '#896A44' : '#E0D174'}
                            svg={squarePieces[`${column}${row}` as keyof typeof squarePieces] ?? ''}
                            setSquarePieces={setSquarePieces}
                        />
                    )})
        ))
    }, [squarePieces])

    useEffect(() =>{
        (async () => {
            if (toSquare.length > 0 && toSquare !== fromSquare){
                const {status, data} = await makeMove(fromSquare + toSquare)
                if (status == 200){
                    if(!data.error){
                        if(data.legal_moves && data.legal_moves.length === 0){
                            toast.success('GAME OVER')
                        }
                        setSquarePieces(prev => ({
                            ...prev,
                            [fromSquare]: '',
                            [toSquare]: prev[fromSquare]
                        }))
                    }
                    else{
                        toast.error(data.error)
                    }
                }
                else{
                    toast.error('an errror ocurred')
                }
            }
        }) ()
    }, [toSquare])

    const handleReset = async () => {
        const {status} = await newGame()
        if (status === 200) setNewGame()
    }

    return(
        <>
            <button type="button" onClick={handleReset}>New Game</button>
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