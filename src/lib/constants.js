/*
DEFINE AES CONSTANTS:
    Nb ← 4                       // Number of columns in AES state
    Nk ← 4                       // Number of 32-bit words in the key
    Nr ← 10                      // Number of rounds
    SBOX ← Array[256] of predefined substitution values
    INV_SBOX ← Array[256] of inverse substitution values
    RCON ← Array of 10 round constants (e.g., [0x01, 0x02, ...])
    MIX_COLUMNS_MATRIX ← 4×4 matrix for MixColumns transformation
    INV_MIX_COLUMNS_MATRIX ← 4×4 matrix for inverse MixColumns
  
DEFINE SHA256 CONSTANTS:
    INITIAL_HASH ← Array of 8 initial 32-bit hash values
    K ← Array of 64 round constants for SHA-256
    BLOCK_SIZE ← 64 bytes (512 bits)
    WORD_SIZE ← 4 bytes (32 bits)
    ROUNDS ← 64
    MAX_MESSAGE_LENGTH ← Maximum message length (2^64 - 1 bits)

DEFINE VISUALIZATION CONSTANTS:
    ANIMATION_DURATION:
        FAST, NORMAL, SLOW ← duration values in milliseconds

    COLORS:
        PRIMARY, SECONDARY, SUCCESS, WARNING, ERROR, INFO, HIGHLIGHT, BACKGROUND (LIGHT and DARK)

    GRID:
        CELL_SIZE, PADDING, GAP, BORDER_WIDTH

    MATRIX:
        MAX_ROWS, MAX_COLS, CELL_FORMAT options (e.g., HEX, BINARY, DECIMAL)

    VISUALIZATION_STATES:
        States like INITIAL, PREPROCESSING, PROCESSING, FINAL, ERROR

    MODES:
        Operation modes such as ECB, CBC, CFB, OFB, CTR

    FORMATS:
        Input/Output formats like HEX, BASE64, UTF8, BINARY

    DIRECTIONS:
        Matrix transformation directions: ROW and COLUMN

    STEP_TYPES:
        Types for different steps (KEY_EXPANSION, SUB_BYTES, SHIFT_ROWS, MIX_COLUMNS, ADD_ROUND_KEY, etc.)

    ERROR_MESSAGES:
        Error message strings for various invalid inputs (e.g., invalid key length, missing IV, etc.)
*/