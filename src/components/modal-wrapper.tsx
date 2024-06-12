type ModalWrapperProps = {
    title: string
    children: React.ReactNode
}

function ModalWrapper({ children, title }: ModalWrapperProps) {
    return (
        <div className="w-full flex flex-col gap-4">
            <h1 className="self-center text-xl">{title}</h1>
            {children}
        </div>
    )
}

export default ModalWrapper
