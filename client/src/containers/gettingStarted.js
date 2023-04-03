import { useNavigate } from "react-router-dom"
import { setIsFirstTimeUser } from "../redux/reducers/userSlice"
import { useDispatch } from "react-redux";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import Logo from '../images/share.svg'

const GettingStarted = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const assignVisitor = () => {
		dispatch(setIsFirstTimeUser(false))
		navigate('/')
	}
	return (

		<div className="landing_pg">
			<img src={Logo} alt="Logo" style={{ maxWidth: '300px' }} />
			<button className="btn" onClick={() => assignVisitor()}><span>Getting Started</span> <TrendingFlatIcon /></button>
		</div>
	);
}

export default GettingStarted;