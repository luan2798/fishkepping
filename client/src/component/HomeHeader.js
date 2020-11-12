import { CartContext } from '../context/CartContext'

const HomeHeader = (props) => (
	<CartContext.Consumer>
		{values => (
			<header className="header">
				<div className="container">
					<img src="./img/logo.svg" id="logo" alt="a" />
					<h1 id="ten">FishCastle</h1>
					<div>
						<div id="cart" onClick={values.onClick}>
							<img src="./img/abc.svg" id="cart-img" alt="b" />
							<div id="container-price">$<span className="price">{values.state.totalCost}</span></div>
						</div>
						<div id="logout">{localStorage.getItem("token") ? "Logout" : ""}</div>
					</div>
				</div>
			</header>
		)}
	</CartContext.Consumer>
)
export default HomeHeader;