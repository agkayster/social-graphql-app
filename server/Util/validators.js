const validateRegisterInput = (username, email, password, confirmPassword) => {
	const errors = {};
	if (username.trim() === '') {
		errors.username = 'Username field must not be empty';
	}
	if (email.trim() === '') {
		errors.email = 'Email field must not be empty';
	} else {
		const regExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
		if (!email.match(regExp)) {
			errors.email = 'Email must be valid email address';
		}
	}
	if (password === '') {
		errors.password = 'Password field must not be empty';
	} else if (password !== confirmPassword) {
		errors.password = 'Password must match Confirm Password';
	}
	// console.log('get errors =>', errors);
	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

const validateLoginInput = (username, password) => {
	const errors = {};

	if (username.trim() === '') {
		errors.username = 'Username field must not be empty';
	}

	if (password === '') {
		errors.password = 'Password field must not be empty';
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

export { validateRegisterInput, validateLoginInput };
