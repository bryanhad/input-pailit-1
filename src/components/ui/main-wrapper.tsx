import React from 'react'
import H1 from './h1'
import H2 from './h2'
import { cn } from '@/lib/utils'

type MainWrapperProps = {
    children: React.ReactNode
    titleDesc?: React.ReactNode
    title?: React.ReactNode
    titleIcon?: React.ReactNode
    noBackgroundAndPadding?: boolean
}

function MainWrapper({
    children,
    title,
    titleIcon,
    titleDesc,
    noBackgroundAndPadding = false,
}: MainWrapperProps) {
    return (
        <div
            className={cn('flex flex-col gap-4 ', {
                'bg-white p-4 lg:p-6 shadow-md rounded-md':
                    noBackgroundAndPadding === false,
            })}
        >
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
