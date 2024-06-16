type TableTitleProps = {
    children: React.ReactNode
}

function TableTitle({ children }: TableTitleProps) {
    return <h2 className="text-2xl">{children}</h2>
}

export default TableTitle
