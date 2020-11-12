let products =[
    {
        "_id": {
            "$oid": "5f78253e2eeba6a9eaadb17a"
        },
        "name": "Halfmoon Betta",
        "tag": "halfmoon",
        "title": "The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees",
        "price": 25,
        "incart": 0
    },
    {
        "_id": {
            "$oid": "5f782dfd076a0b1de8c8cdc8"
        },
        "name": "Dragon Scale Betta",
        "tag": "dragonscale",
        "title": "The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees",
        "price": 35,
        "incart": 0
    },
    {
        "_id": {
            "$oid": "5f782dff076a0b1de8c8cdc9"
        },
        "name": "Crowntail Betta",
        "tag": "crowntail",
        "title": "The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees",
        "price": 7.5,
        "incart": 0
    },
    {
        "_id": {
            "$oid": "5f783227076a0b1de8c8cdca"
        },
        "name": "Veiltail Betta",
        "tag": "veiltail",
        "title": "The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees",
        "price": 5,
        "incart": 0
    }
]

function RenderProduct(product){
	const src=`./img/${product.tag}.jpg`
	const id=`btn_add_to_cart_${product._id}`
	return(
		<div className={product.tagid}>
			<img src={src} alt=""/>
			<h2>{product.name}</h2>
			<p>{product.title}</p>
			<div>
				<div>{parseFloat(product.price).toFixed(2)}</div>
				<button className="button" id={id} onClick={product.onClick}>
								Add to cart
				</button>
			</div>
		</div>
	)
}

function HomeBody(props){
	let k=0;
	let sptag;
	return(
		<main className="main">
            <img src="./img/background.svg" alt="" id="backgroundimg"/>
            <div className="tieude">
                <h3>REDISCOVER</h3>
                <h2>Fishkeeping</h2>
                <p>An <b>exclusive collection of bettas</b> available for everyone.</p>
            </div>
            <div className="container">
                <div className="list-sp">
					{
						products.map(product => {
							if(k%2===0)
							{
								sptag="sp";
							}else{
								sptag="sp2";
							}
							k=k+1;
							return(
								<RenderProduct name={product.name} title={product.title}
									 price={product.price} tag={product.tag} 
									 _id={product._id.$oid} tagid={sptag} onClick={props.onClick} />
							)
						})
					}
                </div>
            </div>
        </main>
	)
}

export default HomeBody;