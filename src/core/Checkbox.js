import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
	const [checked, setChecked] = useState([]);
	const handleToggle = (c) => () => {
		// return the first index or -1
		const currentCategoryId = checked.indexOf(c);
		const newCategoryId = [...checked];
		// if currently checked was not already in checked state > push
		// else pull or remove
		if (currentCategoryId === -1) {
			newCategoryId.push(c);
		} else {
			newCategoryId.splice(currentCategoryId, 1);
		}
        setChecked(newCategoryId);
        handleFilters(newCategoryId);
	};

	return categories.map((c, i) => (
		<li key={i} className="list-unstyled ml-4">
			<input
				onChange={handleToggle(c._id)}
				value={checked.indexOf(c._id === -1)}
				type="checkbox"
				className="form-check-input"
			/>
			<label className="form-check-label">{c.name}</label>
		</li>
	));
};

export default Checkbox;
