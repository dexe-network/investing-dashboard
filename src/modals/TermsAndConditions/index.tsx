import { useCallback, useState } from "react"

import Modal from "components/Modal"
import Checkbox from "components/Checkbox"
import Button from "components/Button"

import {
  ModalText,
  CheckBoxContent,
  CheckboxText,
  CheckboxLink,
  ButtonContainer,
} from "./styled"

interface Props {
  isOpen: boolean
  toggle: () => void
  onAgree: () => void
}

const TermsAndConditions: React.FC<Props> = ({ isOpen, toggle, onAgree }) => {
  const [agree, setAgree] = useState(false)
  const [agreeError, setAgreeError] = useState(false)

  const handleCheckbox = (value) => {
    setAgreeError(false)
    setAgree(value)
  }

  const handleAgree = useCallback(() => {
    setAgreeError(false)
    if (agree) {
      onAgree()
    } else {
      setAgreeError(true)
    }
  }, [agree, onAgree])

  return (
    <Modal title="Terms & Conditions agreement" isOpen={isOpen} toggle={toggle}>
      <ModalText>
        <ul>
          <li>
            Lorem ipsum dolor sit amet, his cu zril habemus. Ex cum nostrud
            feugiat, cu duo affert discere facilisis.
          </li>
          <li>
            Te nec adolescens vituperata referrentur, summo minimum oportere pri
            ut.
          </li>
          <li>
            Impedit necessitatibus ne vix, doming disputando his et. Falli
            expetenda voluptatibus at sea. Meis habeo cu pri, nam ne solet
            possit torquatos, et mei nobis invenire. Falli expetenda
            voluptatibus at sea. Meis habeo cu pri, nam ne solet possit
            torquatos, et mei nobis invenire.
          </li>
          <li>
            Cum cu porro temporibus delicatissimi. Diceret singulis ut mei, ut
            lorem singulis vim. Ut eam mutat novum appareat, ei vel quot saepe
            animal.
          </li>
          <li>
            Impedit necessitatibus ne vix, doming disputando his et. Falli
            expetenda voluptatibus at sea. Meis habeo cu pri, nam ne solet
            possit torquatos, et mei nobis invenire. Falli expetenda
            voluptatibus at sea. Meis habeo cu pri, nam ne solet possit
            torquatos, et mei nobis invenire.
          </li>
        </ul>
      </ModalText>
      <CheckBoxContent>
        <Checkbox
          name="agree-terms"
          checked={agree}
          onChange={handleCheckbox}
        />
        <CheckboxText>
          I agree to the
          <CheckboxLink>
            <a> Tearms of Use </a>
          </CheckboxLink>
          and
          <CheckboxLink>
            <a> Privacy Police</a>
          </CheckboxLink>
        </CheckboxText>
      </CheckBoxContent>
      <ButtonContainer>
        <Button full onClick={handleAgree}>
          Sing and proceed
        </Button>
      </ButtonContainer>
    </Modal>
  )
}

export default TermsAndConditions
