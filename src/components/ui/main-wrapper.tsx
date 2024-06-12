import React from "react"
import H1 from "./h1"
import H2 from "./h2"

type MainWrapperProps = {
    children: React.ReactNode
    titleDesc?: React.ReactNode
    title?: React.ReactNode
    titleIcon?: React.ReactNode
}

function MainWrapper({ children, title, titleIcon, titleDesc }: MainWrapperProps) {
    return (
        <div className="flex flex-col gap-4 bg-white p-4 lg:p-6 rounded-md shadow-md">
            {(title || titleIcon) && (
                <div className="flex items-center gap-3">
                    {titleIcon}
                    <div className="flex flex-col  gap-3">
                        {title && <H1>{title}</H1>}
                        {titleDesc && <p>{titleDesc}</p>}

                    </div>
                </div>
            )}
            {children}
        </div>
    )
}

export default MainWrapper
