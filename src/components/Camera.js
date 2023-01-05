import FaceLandmark from "./FaceLandmark";
import WithFaceExpression from "./WithFaceExpression";
import {useContext} from "react";
import {MyContext} from "../hooks/MyContext";

const Camera = () => {
    const {state} = useContext(MyContext);
    return (
        <div>
            {
                state == 1 ? <WithFaceExpression/> : <FaceLandmark/>
            }
        </div>
    )
}

export default Camera;