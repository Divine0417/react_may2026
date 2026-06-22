import { useSelector, useDispatch } from "react-redux";
import { Increament, Descreament } from "../Redux/countSlice";

const Counts = () => {
    const { value } = useSelector((state) => state.countSlice)
    console.log(value);
    const dispatch = useDispatch()

    return (
        <div>
            Counts
            <p>{value}</p>
            <button onClick={() => dispatch(Increament())}>Increase</button>
            <button onClick={() => dispatch(Descreament())}>Decrease</button>
        </div>
    )

}

export default Counts