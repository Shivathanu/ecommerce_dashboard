import React, { useState } from 'react'

const RadioButton = ({ prices, handleFilters }) => {
	// eslint-disable-next-line
	const [value, setValue] = useState(0);

	const handleChange = (event) => {
		handleFilters(event.target.value);
		setValue(event.target.value);
	};

	return prices.map((p, i) => (
		<div key={i}>
			<input
				onChange={handleChange}
				value={`${p._id}`}
				type="radio"
				name={p}
				className="mr-2 ml-2"
			/>
			<label className="form-check-label">{p.name}</label>
		</div>
	));
};

export default RadioButton;
