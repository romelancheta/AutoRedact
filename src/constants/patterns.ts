// ============================================================================
// REGEX PATTERNS FOR SENSITIVE DATA
// ============================================================================

export const SENSITIVE_PATTERNS = {
    // Email: Standard compliant, but relaxed TLD to allow digits for OCR noise (e.g. .i1o)
    email: /\b[a-zA-Z0-9][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}\b/g,

    // IPv4: Relaxed to allow 1-4 digits per octet.
    ipv4: /\b(?:\d{1,4}\.){3}\d{1,4}\b/g,

    // IPv6: Standard IPv6 (simplified for performance, covers common cases)
    ipv6: /(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|:(?::[0-9a-fA-F]{1,4}){1,7}|::/g,

    // Credit Card / Finance patterns
    // 1. Standard: Groups of 4 with separators (4-4-4-4)
    // 2. Amex: Groups of 4-6-5 with separators
    // 3. Contiguous digits (13-19) - Lookbehind/ahead ensures not part of hyphenated string (UUIDs)
    creditCard: /\b(?:\d{4}[- ]){3}\d{4}\b|\b\d{4}[- ]\d{6}[- ]\d{5}\b|(?<!-)\b\d{13,19}\b(?!-)/g,

    // Banking / Crypto
    iban: /\b[A-Z]{2}\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{2}\b|\b[A-Z]{2}\d{2}[a-zA-Z0-9]{11,30}\b/g,
    bitcoin: /\b(?:1|3|bc1)[a-zA-Z0-9]{25,39}\b/g,

    // PII
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
    pan: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g,

    // 5. Secrets (API Keys, Private Keys, Auth Tokens)
    secrets: [
        // Stripe, AWS, GitHub (Original)
        /\b((?:sk|pk)_(?:live|test)_[0-9a-zA-Z]{16,}|gh[pous]_[0-9a-zA-Z]{30,}|AKIA[0-9A-Z]{16,20}|wJalrX[A-Za-z0-9+/]{30,})\b/g,
        // OpenAI
        /\bsk-[a-zA-Z0-9]{30,}\b/g,
        // Google Cloud
        /\bAIza[0-9A-Za-z\\-_]{35}\b/g,
        // Slack matches xoxb, xoxp, xoxr, xoxa start
        /\bxox[baprs]-[a-zA-Z0-9-]{10,}\b/g,
        // JWT (3 parts separated by dots)
        /\beyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b/g,
        // Database Connection Strings
        /(?:postgres|mysql|mongodb|redis|sqlserver):\/\/[^\s]+/g,
        // Private Key Header (looks for the BEGIN block)
        /-----BEGIN [A-Z ]+ PRIVATE KEY-----/g
    ],

    // Network
    mac: /\b(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}\b/g
};
