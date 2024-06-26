import React from 'react'

type SectionProps = {
    title:string
    children:React.ReactNode
    className?:string
}

function CreditorFormSection({title, children, className}:SectionProps) {
    return (
        <div className={className}>
            <h2 className="font-bold text-2xl mb-2">{title}</h2>
            {children}
        </div>
    )
}

export default CreditorFormSection
