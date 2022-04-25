import React from "react"
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

const TermsAndConditions = () => {
  return (
    <Modal title="Terms & Conditions agreement" isOpen toggle={() => {}}>
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
        <Checkbox name="agree-terms" onChange={() => {}} />
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
        <Button full>Sing and proceed</Button>
      </ButtonContainer>
    </Modal>
  )
}

export default TermsAndConditions
