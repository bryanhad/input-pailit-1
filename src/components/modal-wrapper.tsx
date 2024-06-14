type ModalWrapperProps = {
    title: string
    desc?:string
    children: React.ReactNode
}

function ModalWrapper({ children, title, desc }: ModalWrapperProps) {
    return (
        <div className="w-full flex flex-col gap-4">
            <h1 className="self-center text-xl">{title}</h1>
            {desc && <p className="">{desc}</p>}
            {children}
        </div>
    )
}

export default ModalWrapper
