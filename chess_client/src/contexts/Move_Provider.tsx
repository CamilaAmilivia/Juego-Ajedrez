import { ReactNode, createContext, Dispatch, SetStateAction, useState } from "react";


type MoveContextProps = {
    firstSelection: boolean 
    setFirstSelection: Dispatch<SetStateAction<boolean>>
    fromSquare: string
    setFromSquare: Dispatch<SetStateAction<string>>
    toSquare: string
    setToSquare: Dispatch<SetStateAction<string>>
}

export const MoveContext = createContext<MoveContextProps>({
    firstSelection : false,
    setFirstSelection:() => {},
    fromSquare: '',
    setFromSquare: () => {},
    toSquare: '',
    setToSquare: () => {}
})

type MoveProviderProps = {
    children: ReactNode
}

export function MoveProvide({children}: MoveProviderProps){
    const [firstSelection,setFirstSelection] = useState<boolean>(false)
    const [fromSquare,setFromSquare] = useState<string>('')
    const [toSquare,setToSquare] = useState<string>('')

    return(
        <MoveContext.Provider value={{
            firstSelection,
            setFirstSelection,
            fromSquare,
            setFromSquare,
            toSquare,
            setToSquare
        }}>
            {children}
        </MoveContext.Provider>
    )
}