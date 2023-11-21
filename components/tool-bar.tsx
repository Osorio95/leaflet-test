import React from 'react'
import Button from './ui/button'

type Props = {
    colorBtn: string
    removeHandler: () => void
}

const ToolBar = ({ colorBtn, removeHandler }: Props) => {


    return (
        <div className='absolute grid grid-cols-12 top-0 bottom-0 right-0 left-0 p-8 pointer-events-none z-50'>
            <div className="col-span-2 col-start-11 bg-black bg-opacity-50 text-white p-8 rounded-lg pointer-events-auto">
                <div className="flex flex-col gap-4">
                    <Button key={colorBtn} color={colorBtn} >
                        Demo
                    </Button>
                    <div className="flex">
                        <Button color={colorBtn} onClick={() => removeHandler()}>
                            Clear
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolBar