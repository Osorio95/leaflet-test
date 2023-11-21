import React, { PropsWithChildren } from 'react'

type Props = {
    color: string
    onClick?: () => void
}

const Button: React.FC<PropsWithChildren<Props>> = ({ children, color, onClick }) => {

    return (
        <button onClick={ () => onClick ? onClick() : null} className="py-2 px-4 rounded-lg" style={{ backgroundColor: color }}>
            {children}
        </button>
    );
}

export default Button