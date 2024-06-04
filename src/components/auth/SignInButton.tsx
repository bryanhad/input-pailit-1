import { Button } from "../ui/button"
import Modal from "../ui/modal"
import SignInForm from "./SignInForm"

function SignInButton() {
  return (
    <Modal
        buttonCustom={
            <Button>
                Sign In
            </Button>
        }
    >
        <SignInForm/>
    </Modal>
)
}

export default SignInButton