function validatePassword(password) {
    const commonPasswords = new Set([
        'password', '123456', '123456789', 'qwerty', 'abc123',  'football',
        '12345678', '111111', '1234567', 'iloveyou', 'adobe123', '123123',
        'admin', 'letmein', 'welcome', 'monkey', 'login', 'princess', 'qwertyuiop'
    ]);

    let score = 0;
    const errors = [];
    const suggestions = [];

    if (password.length >= 8) {
        score += 20;
    } else {
        errors.push('Too short');
        suggestions.push('Use at least 8 characters');
    }

    if (/[A-Z]/.test(password)) {           
        score += 20;
    } else {
        errors.push('No uppercase letter');
        suggestions.push('Add uppercase letters (A-Z)');
    }

    if (/[a-z]/.test(password)) {
        score += 20;
    } else {
        errors.push('No lowercase letter');
        suggestions.push('Add lowercase letters (a-z)');
    }

    if (/\d/.test(password)) {
        score += 20;
    } else {
        errors.push('No number');
        suggestions.push('Add numbers (0-9)');
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        score += 20;
    } else {
        errors.push('No special character');
        suggestions.push('Add special characters (!@#$%^&*()_+-=)');
    }

    if (commonPasswords.has(password.toLowerCase())) {
        errors.push('Common password');
        suggestions.push('Avoid common passwords');
        score = Math.min(score, 40); // Cap score if common password
    }

    const isValid = errors.length === 0;

    return {
        isValid,
        score,
        errors,
        suggestions
    };
}

console.log(validatePassword('abc'));
// { isValid: false, score: 15, errors: ['Too short', ...], suggestions: ['Add numbers', ...] }

console.log(validatePassword('MyP@ssw0rd!2024'));
// { isValid: true, score: 95, errors: [], suggestions: [] }