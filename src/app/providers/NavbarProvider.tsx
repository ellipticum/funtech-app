'use client'

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    SetStateAction,
    Dispatch,
    useEffect
} from 'react'

interface INavbarContext {
    isHidden: boolean
    setIsHidden: Dispatch<SetStateAction<boolean>>
}

const NavbarContext = createContext<INavbarContext | undefined>(undefined)

export const useNavbar = () => {
    const context = useContext(NavbarContext)
    if (context === undefined) {
        throw new Error('useNavbar must be used within a NavbarProvider')
    }
    return context
}

interface Props {
    children: ReactNode
}

const NavbarProvider = ({ children }: Props) => {
    const [isHidden, setIsHidden] = useState<boolean>(false)

    useEffect(() => {
        if (isHidden) {
            document.body.classList.remove('overflowHidden')
        } else {
            document.body.classList.add('overflowHidden')
        }
    }, [isHidden])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsHidden(true)
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <NavbarContext.Provider
            value={{
                isHidden,
                setIsHidden
            }}
        >
            {children}
        </NavbarContext.Provider>
    )
}

export default NavbarProvider
