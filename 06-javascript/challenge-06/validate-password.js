const validatePassword = (password) => {
    const commonPasswords = new Set([
        'password', '123456', '123456789', 'qwerty', 'abc123', 'football',
        '12345678', '111111', '1234567', 'iloveyou', 'adobe123', '123123',
        'admin', 'letmein', 'welcome', 'monkey', 'login', 'princess', 'qwertyuiop'
    ]);

    let score = 0;
    const errors = [];
    const suggestions = [];

    const rules = [
        {
            test: pwd => pwd.length >= 8,
            error: 'Too short',
            suggestion: 'Use at least 8 characters',
            points: 20
        },
        {
            test: pwd => /[A-Z]/.test(pwd),
            error: 'No uppercase letter',
            suggestion: 'Add uppercase letters (A-Z)',
            points: 20
        },
        {
            test: pwd => /[a-z]/.test(pwd),
            error: 'No lowercase letter',
            suggestion: 'Add lowercase letters (a-z)',
            points: 20
        },
        {
            test: pwd => /\d/.test(pwd),
            error: 'No number',
            suggestion: 'Add numbers (0-9)',
            points: 20
        },
        {
            test: pwd => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
            error: 'No special character',
            suggestion: 'Add special characters (!@#$%^&*()_+-=)',
            points: 20
        }
    ];

    rules.forEach(({ test, error, suggestion, points }) => {
        if (test(password)) {
            score += points;
        } else {
            errors.push(error);
            suggestions.push(suggestion);
        }
    });

    if (commonPasswords.has(password.toLowerCase())) {
        errors.push('Common password');
        suggestions.push('Avoid common passwords');
        score = Math.min(score, 40);
    }

    return {
        isValid: errors.length === 0,
        score,
        errors,
        suggestions
    };
};

// Tests
console.log(validatePassword('abc'));// Weak password
console.log(validatePassword('MyP@ssw0rd!2024'));// Strong password
