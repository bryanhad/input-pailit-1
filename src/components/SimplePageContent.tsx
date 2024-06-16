import { cn } from '@/lib/utils'
import React from 'react'
import { Redo } from 'lucide-react'

type DefaultInputsSimplePageContent = {
    title: {
        firstLine: string
        secondLine: string
    }
    desc: {
        firstLine: string
        secondLine?: string
    }
    navigateButton: React.ReactNode
}

type Props = {
    icon: React.ReactNode
    className?: string
} & (
    | { template: DefaultInputsSimplePageContent; children?: never }
    | {
          children: React.ReactNode
          template?: never
      }
)

function SimplePageContent({
    className,
    icon,
    template,
    children,
}: Props) {
    return (
        <div
            className={cn(
                'flex justify-center mt-[20vh] sm:max-lg:mt-[25vh] lg:w-[96%] lg:max-w-[1000px] lg:mx-auto',
                className
            )}
        >
            <div className="lg:grid grid-cols-3 relative w-full">
                <div className="flex items-center justify-center bg-white lg:rounded-tl-[60px] relative">
                    {icon}
                    <div className="hidden lg:block size-20 absolute bottom-0 left-0 black-white-diagonal" />
                </div>
                <div className="col-span-2 flex flex-col gap-4 justify-center text-center max-lg:rounded-3xl lg:text-start bg-white lg:rounded-br-[60px] lg:rounded-tr-[60px] max-lg:p-6 py-6 pb-8 lg:pr-8 relative z-10">
                    {children}
                    {template && (
                        <>
                            <div className="space-y-2">
                                <h1 className="text-4xl lg:text-[2.8rem] font-bold leading-tight lg:leading-[1.2] select-none w-full max-w-[98%] lg:max-w-[80%]">
                                    {template.title.firstLine}
                                    <br />
                                    {template.title.secondLine}
                                </h1>
                                {/* ARROW */}
                                <div className="mt-2 relative select-none">
                                    <hr className="border-black border-4 rounded-full mr-8" />
                                    <div className="size-3 bg-black rounded-full absolute top-1/2 -translate-y-1/2 right-[14px]" />
                                    <Redo
                                        className="shrink-0 absolute -right-[14px] -top-[7px] translate-x-1/2 rotate-[92deg]"
                                        size={100}
                                    />
                                </div>
                            </div>
                            <p className="w-full max-w-[450px] max-lg:mx-auto select-none">
                                {template.desc.firstLine}{' '}
                                {template.desc.secondLine && (
                                    <br className="lg:hidden" />
                                )}
                                {template.desc.secondLine}
                            </p>
                            {template.navigateButton}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SimplePageContent
