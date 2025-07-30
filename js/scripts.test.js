describe('Username Validation', () => {
	const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	test('Valid username passes regex', () => {
		const validUsernames = [
			'Valid1@Username',
			'Test123$User',
			'Strong@Pass1',
			'User!Name2@',
			'Example@1234'
		];

		validUsernames.forEach(username => {
			expect(usernameRegex.test(username)).toBe(true);
		});
	});

	test('Invalid username fails regex', () => {
		const invalidUsernames = [
			'invalidusername', // No uppercase, number, or special character
			'INVALID123', // No lowercase or special character
			'short1$', // Less than 8 characters
			'NoSpecialChar1', // Missing special character
			'12345678$', // No letters
			'@InvalidStart1', // Starts with a special character
			'Valid@User', // Missing a number
			'Valid1234', // Missing a special character
			'Valid@123', // Less than 8 characters
			'Valid@1234567890123456789012345678901234567890' // Exceeds typical length limits
		];

		invalidUsernames.forEach(username => {
			expect(usernameRegex.test(username)).toBe(false);
		});
	});

	test('Edge cases for username validation', () => {
		const edgeCaseUsernames = [
			'', // Empty string
			'        ', // Only spaces
			'Valid@123 ', // Trailing space
			' Valid@123', // Leading space
			'Valid@ 123', // Space in the middle
			'Valid@123\n', // Contains newline
			'Valid@123\t' // Contains tab
		];

		edgeCaseUsernames.forEach(username => {
			expect(usernameRegex.test(username)).toBe(false);
		});
	});
});