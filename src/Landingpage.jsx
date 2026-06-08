import { FaEye } from "react-icons/fa";
import hero from "./assets/hero.png"
import { BsAirplaneEnginesFill } from "react-icons/bs";
// import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";

function Landingpage() {
    const [isloading, setIsloading] = useState(false)

    useEffect(() => {
        alert("Welcome to my React App")
    }, [isloading])

    const user = "students"
    const mysty = {
        width: "200px",
        height: "200px",
        backgroundColor: "green",
        student: {
            color: "white",
            fontSize: "20px"
        }
    }
    const clickme = () => {
        console.log("working");
        setIsloading(!isloading)
    }

    return (
        <>
            <button onClick={clickme}>click</button>
            <input onChange={(e) => console.log(e)} type="text" />
            {/* <Navbar/> */}
            <div style={mysty}>
                {/* <h1>Welcome to your landingpage {2 *2}</h1> */}
                <div style={mysty.student}>{user}</div>
            </div>
            <div>
                <BsAirplaneEnginesFill />
                <FaEye />
                <img src={hero} alt="" />

            </div>

        </>
    )
}



export default Landingpage