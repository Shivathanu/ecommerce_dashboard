import React from "react";
import { API } from '../config';

const ShowImage = ({ item, url }) => (
	<div className="product-img text-center">
		<img
			src={`${API}/${url}/photo/${item._id}`}
			alt={item.name}
			className="rounded mx-auto d-block mb-3"
			style={{ maxWidth: "100%", maxHeight: "100%" }}
		/>
	</div>
);

export default ShowImage;
