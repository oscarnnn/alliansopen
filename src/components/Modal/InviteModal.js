import React, { useState } from "react";
import { Modal, ButtonGroup, ToggleButton } from "react-bootstrap";
import firebaseApp from "../../firebase";
import {CgClose} from "react-icons/cg";
import "./InviteModal.css"

function InviteModal(props) {
  const [kod, setKod] = useState("");
  const [competitor, setCompetitor] = useState({
    firstName: "",
    lastName: "",
    answer: ""
  })

  async function getCompetitor(competitor) {
    if (competitor) {
      const ref = firebaseApp.firestore().collection("competitors");
      const doc = await ref.doc(competitor).get();
      if (!doc.data()) {
        const emptyCompetitor = {
          firstName: "",
          lastName: "",
          answer: ""
        }
        setCompetitor(emptyCompetitor)
        console.log("No such competitor!")
      } else {
        console.log()
        doc.data() && setCompetitor(doc.data())
      }
    }
  }

  async function updateStatus(status) {
    const ref = firebaseApp.firestore().collection("competitors");
    const doc = await ref.doc(kod);

    return doc.update({
      answer: status
    })
      .then(function () {
        let tmpCompetitor = {
          ...competitor
        }
        tmpCompetitor.answer = status
        setCompetitor(tmpCompetitor)
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{display:"flex", flexDirection:"column"}}>
        <CgClose className="invCloseButton" onClick={() => props.onHide()}/>
        <div className="formContainer">
          <h4 className="formLabel">Skriv in din kod</h4>
          <div style={{flexDirection:"column"}}>
            <input type="text" value={kod} onChange={(v) => setKod(v.target.value)} />
            <button className="submitButton" onClick={() => getCompetitor(kod)}> Submit </button>
          </div>
        </div>
        {competitor.firstName !== "" &&
          <div className="greetingContainer">
            <h2 className="greetingName">Tjena {competitor.firstName + " " + competitor.lastName}!</h2>
            <p className="greetingText">Joinar du touren?</p>
            <ButtonGroup toggle className="mb-2">
              <ToggleButton
                className="tglButtonLinear"
                key="1"
                type="radio"
                variant="secondary"
                value={"Yes"}
                checked={competitor.answer === "Yes"}
                onChange={(e) => updateStatus(e.currentTarget.value)}>Klart jag är där!</ToggleButton>
              <ToggleButton
                className="tglButtonLinear"
                key="2"
                type="radio"
                variant="secondary"
                value={"No"}
                checked={competitor.answer === "No"}
                onChange={(e) => updateStatus(e.currentTarget.value)}>Nej för jag suger!</ToggleButton>
            </ButtonGroup>
          </div>}
      </Modal.Body>
    </Modal>
  );
}

export default InviteModal;

