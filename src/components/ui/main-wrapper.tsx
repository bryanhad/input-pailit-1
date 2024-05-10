import React from 'react'

function MainWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4 bg-white p-4 lg:p-6 rounded-md shadow-md">
            {children}
        </div>
    )
}

export default MainWrapper
