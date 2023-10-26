import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
	const [formData, setFormData] = useState(initialState);

	const handleFormDataChange = (e) => {
		const { value, id } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		callback();
		setFormData(initialState);
	};
	return {
		handleFormDataChange,
		handleSubmit,
		formData,
	};
};
