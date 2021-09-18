import React ,{useState} from 'react';
import{Modal,Button,Row,Col,Form} from "react-bootstrap"


const PopUp=(props)=> {
    console.log("kishan",props)
    const [popup,setPopUp]=useState(props.triger)
    return (
        <>
            { popup?(<div style={{width:"500px"}}> <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Saved leads</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setPopUp(false)}>Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog></div>): <img src="assets/images/Frame 543.png" alt="" />}
        </>

    );
};

export default PopUp;