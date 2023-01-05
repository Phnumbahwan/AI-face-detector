import '../App.css'
import {useContext} from "react";
import {MyContext} from "../hooks/MyContext";

const Options = () => {
    const {setState} = useContext(MyContext);

    return (
        <div style={{ width:"100%" }} className={'center'}>
            <div style={{ display:"flex", flexDirection:"column" }}>
                <div style={{ margin:"5px" }}>
                    <button onClick={() => setState(1)}>Face 1(with face expression)</button>
                </div>
                <div style={{ margin:"5px" }}>
                    <button onClick={() => setState(2)}>Face 2</button>
                </div>
            </div>
        </div>
    )
}

export default Options;