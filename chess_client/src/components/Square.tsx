import { Dispatch, SetStateAction, useContext, useDebugValue } from "react"
import parse from 'html-react-parser'
import DOMPurify from "dompurify"
import { MoveContext } from "../context/Move_provider"

type SquareProps = {
    name:string,
    color: string
    svg: string | Node 
    setSquarePieces:  Dispatch<SetStateAction<{[key: string]: string | undefined}>>
}

export function Square({name,color,svg, setSquarePieces}: SquareProps){
    const {firstSelection, fromSquare} = useContext(MoveContext)
    return (
        <div style={{position:'relative', width: '70px', height:'70px', 
        background: firstSelection && fromSquare == name ? '#2DC337' : color ,
        border: '1px solid #000'}}>
            <div style={{ position: 'absolute',top: 0, right: 2, fontSize: 10, color:'#000' }}>
                {name}
            </div>
            {parse(DOMPurify.sanitize(svg))}
        </div>
    )
}