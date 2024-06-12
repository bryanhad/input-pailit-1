import SimplePopover from "@/components/SimplePopover"
import { cn } from "@/lib/utils"
import { Clock8, MousePointerClick } from "lucide-react"

function AddNewUserDescription() {
    return (
        <div className="font-light space-y-4">
            <p>
                This form submission will send an email containing a
                <ImportantPopover
                    tip="Verification link"
                    className="bg-blue-400 hover:bg-blue-500"
                >
                    Magic Link
                </ImportantPopover>
                (verification link) to the new user.
            </p>
            <p>
                The email will be sent from{" "}
                <ImportantPopover
                    tip="Sender email"
                    className="mx-0 bg-transparent border-solid border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white"
                >
                    {process.env.EMAIL_FROM}
                </ImportantPopover>
            </p>
            <MagicLinkExplanation />
            <PostVerificationExplanation />
            <SessionExplanation />
        </div>
    )
}

function MagicLinkExplanation() {
    return (
        <div className="mb-2 bg-blue-50 rounded-md p-2">
            <p className="mb-2">
                <strong>
                    <ImportantPopover
                        tip="Verification link"
                        className="bg-blue-400 hover:bg-blue-500"
                    >
                        Magic Link
                    </ImportantPopover>
                    Explanation:
                </strong>
            </p>
            <ul className="list-disc pl-8 space-y-1">
                <li>
                    The magic link is intended to verify the user&apos;s email
                    address.
                </li>
                <li>
                    The magic link is valid for{" "}
                    <ImportantPopover
                        tip="Magic link expiry time"
                        className="mx-0"
                        isCritical
                    >
                        24 hours
                    </ImportantPopover>{" "}
                    before <strong>expire.</strong>
                </li>
                <li>
                    In case of expiry,{" "}
                    <strong>
                        the admin will need to send a new magic link to the user
                    </strong>
                    .
                </li>
            </ul>
        </div>
    )
}

function PostVerificationExplanation() {
    return (
        <div className="mb-2 bg-emerald-50 rounded-md p-2">
            <div className="mb-2">
                <ImportantPopover
                    tip="After user clicked their magic link"
                    className="mx-0 mr-1.5 bg-emerald-400 hover:bg-emerald-500"
                >
                    <div className="flex items-center gap-2">
                        <MousePointerClick size={15} className="shrink-0" />
                        Post-Verification Process
                    </div>
                </ImportantPopover>
            </div>
            <ul className="list-disc pl-8 space-y-1">
                <li>
                    Upon clicking the magic link,{" "}
                    <strong>the user&apos;s email will be verified</strong>.
                </li>
                <li>
                    The user will then be prompted to complete their account
                    setup by setting up their account name and password.
                </li>
                <li className="relative">
                    <ImportantPopover
                        tip="Requirement"
                        className="mx-0 -translate-x-1"
                        isCritical
                    >
                        The user must complete their account setup to be able to
                        sign in.{" "}
                    </ImportantPopover>{" "}
                    <div className="relative p-2"></div>
                </li>
            </ul>
        </div>
    )
}

function SessionExplanation() {
    return (
        <div className="mb-2 bg-amber-50 rounded-md p-2">
            <div className="mb-2">
                <ImportantPopover
                    tip="User's visit time"
                    className="mx-0 mr-1.5 bg-amber-500 hover:bg-amber-600"
                >
                    <div className="flex items-center gap-2">
                        <Clock8 size={15} className="shrink-0" />
                        User&apos;s Session
                    </div>
                </ImportantPopover>
            </div>
            <ul className="list-disc pl-8 space-y-1">
                <li>
                    Once the email is verified,{" "}
                    <strong>the user&apos;s session will be valid for</strong>{" "}
                    <ImportantPopover
                        tip="User's session expiry time"
                        className="mx-0"
                        isCritical
                    >
                        30 days
                    </ImportantPopover>
                </li>
                <li className="leading-7">
                    If the session expires,{" "}
                    <strong>
                        the user can request a new magic link by attempting to
                        sign in
                    </strong>
                    .<br />A notification will prompt the user to check their
                    email inbox for the new magic link.
                </li>
            </ul>
        </div>
    )
}

type MagicLinkIconProps = {
    className?: string
}

function ImportantPopover({
    className,
    children,
    isCritical = false,
    tip,
}: MagicLinkIconProps & {
    children: React.ReactNode
    isCritical?: boolean
    tip: string
}) {
    return (
        <SimplePopover
            tip={tip}
            className={cn(
                "mx-1 border-none bg-blue-400 hover:bg-blue-500 duration-300 text-white",
                {
                    "border-solid px-1 border-transparent hover:border-red-500 bg-transparent hover:text-red-500 text-red-500 hover:bg-transparent":
                        isCritical,
                },
                className
            )}
        >
            <div className="flex items-center">
                {isCritical ? (
                    <p className="font-normal">{children}</p>
                ) : (
                    <code className="font-normal text-sm">{children}</code>
                )}
            </div>
        </SimplePopover>
    )
}

export default AddNewUserDescription
