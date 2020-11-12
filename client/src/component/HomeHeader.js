function HomeHeader(props) {
	let lg=localStorage.getItem("token") ? "Logout":""
	return(
		<header className="header">
			<div className="container">
				<img src="./img/logo.svg" id="logo" alt="a" />
				<h1 id="ten">FishCastle</h1>
				<div>
					<div id="cart" onClick={props.onClick}>
						<img src="./img/abc.svg" id="cart-img" alt="b"/>
						<div id="container-price">$<span className="price">{props.value}</span></div>
					</div>
					<div id="logout">{lg}</div>
				</div>
			</div>
		</header>
	)
}
export default HomeHeader;