import React from "react";
import { Button } from "react-bootstrap";
import firebaseApp from "../../firebase";
import InviteModal from "../Modal/InviteModal";

import Profile from "./Profile";
import './Competitors.css'

const ref = firebaseApp.firestore().collection("competitors");

async function getCompetitors() {
  const items = [];
  const querySnapshot = await ref
    .get();

  querySnapshot.forEach((doc) => {
    doc.data().answer === "Yes" && items.push(doc.data())
  });

  return items;
}


class Competitor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalShow: false,
      competitors: []
    }
  }

  async componentDidMount() {
    this.updateCompetitors()
  }

  updateCompetitors() {
    getCompetitors().then((res) => {
      this.setState({
        competitors: res
      },
        () => { console.log(this.state.competitors.length) })
    });
  }

  closeModal() {
    this.setState({
      modalShow: false
    })
    this.updateCompetitors()
  }
  render() {
    return (
      <div
        className="competitors"
      >
        <Button variant="Dark" className="modalButton" onClick={() => this.setState({
          modalShow: true
        })}>
          Har du fått en inbjudan?
      </Button>
        <InviteModal
          show={this.state.modalShow}
          onHide={() => this.closeModal()}
        />
        <div className="competitorContainer">
          { this.state.competitors &&
            this.state.competitors.map(c => {
              return <Profile firstName={c.firstName} lastName={c.lastName} nickName={c.nickName} imgSrc={c.imgSrc}/>
            })
          }
        </div>

      </div>
    )
  }
};

export default Competitor;
