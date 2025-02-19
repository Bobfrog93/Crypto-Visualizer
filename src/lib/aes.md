/*
CLASS AES128:
    ATTRIBUTES:
        steps ← empty list

    METHOD encrypt(input, key, mode = "ECB", iv = null):
        Reset steps to an empty list
        IF input is a string:
            Convert input to byte array
        ELSE:
            Use input as bytes

        IF key is a string:
            Convert key to byte array
        ELSE:
            Use key as bytes

        IF length of key bytes ≠ 16:
            RAISE error "AES-128 requires a 16-byte key"

        expandedKey ← keyExpansion(key)
        Record a step "Key Expansion" with details about original and expanded keys

        IF mode is "CBC":
            IF iv is missing:
                RAISE error "CBC mode requires an initialization vector"
            Convert iv to bytes (if necessary)
            IF length of iv bytes ≠ 16:
                RAISE error "IV must be 16 bytes"
            result ← encryptCBC(input bytes, expandedKey, iv)
        ELSE:
            result ← encryptECB(input bytes, expandedKey)

        RETURN an object containing:
            ciphertext: result
            steps: recorded steps

    METHOD encryptECB(input, expandedKey):
        blocks ← pad the input (using PKCS#7) and split into 16-byte blocks
        encryptedBlocks ← empty list
        FOR each block in blocks:
            Record step "Block Processing" with current state matrix
            encryptedBlock ← encryptBlock(block, expandedKey)
            Append encryptedBlock to encryptedBlocks
        RETURN concatenation of encryptedBlocks

    METHOD encryptCBC(input, expandedKey, iv):
        blocks ← pad and split input into 16-byte blocks
        encryptedBlocks ← empty list
        previousBlock ← iv
        FOR each block in blocks:
            Record step "Block Processing" with message "XOR with previous block"
            xoredBlock ← XOR(block, previousBlock)
            encryptedBlock ← encryptBlock(xoredBlock, expandedKey)
            Append encryptedBlock to encryptedBlocks
            previousBlock ← encryptedBlock
        RETURN concatenation of encryptedBlocks

    METHOD encryptBlock(block, expandedKey):
        state ← Create 4x4 state matrix from block
        // Initial Round
        state ← addRoundKey(state, extractRoundKey(expandedKey, round=0))
        Record step "Initial Round - AddRoundKey" with state matrix

        // Main Rounds 1 to 9
        FOR round from 1 to 9:
            state ← subBytes(state)
            Record step "Round {round} - SubBytes" with state matrix
            state ← shiftRows(state)
            Record step "Round {round} - ShiftRows" with state matrix
            state ← mixColumns(state)
            Record step "Round {round} - MixColumns" with state matrix
            state ← addRoundKey(state, extractRoundKey(expandedKey, round))
            Record step "Round {round} - AddRoundKey" with state matrix

        // Final Round (no MixColumns)
        state ← subBytes(state)
        Record step "Final Round - SubBytes" with state matrix
        state ← shiftRows(state)
        Record step "Final Round - ShiftRows" with state matrix
        state ← addRoundKey(state, extractRoundKey(expandedKey, round=10))
        Record step "Final Round - AddRoundKey" with state matrix

        RETURN state

    METHOD keyExpansion(key):
        Initialize expandedKey array of 176 bytes
        Set first 16 bytes of expandedKey to key
        FOR i from 4 to 43:
            temp ← Get 4-byte word at position i-1 from expandedKey
            IF i is divisible by 4:
                temp ← rotWord(temp)         // Rotate word
                temp ← subWord(temp)         // Substitute each byte using SBOX
                temp[0] ← temp[0] XOR RCON value for (i/4 - 1)
            prevWord ← Get word at position i-4
            newWord ← XOR(prevWord, temp)
            Set newWord at position i in expandedKey
        RETURN expandedKey

    // Transformation Functions:
    METHOD subBytes(state):
        FOR each byte in state:
            Replace byte with SBOX[byte]
        RETURN new state

    METHOD shiftRows(state):
        newState ← empty 16-byte array
        FOR each row from 0 to 3:
            FOR each column from 0 to 3:
                newState[row + 4 * col] ← state[row + 4 * ((col + row) mod 4)]
        RETURN newState

    METHOD mixColumns(state):
        newState ← empty 16-byte array
        FOR each column from 0 to 3:
            FOR each row from 0 to 3:
                sum ← 0
                FOR i from 0 to 3:
                    sum ← sum XOR galoisMultiply(state[i + 4 * col], MIX_COLUMNS_MATRIX[row][i])
                newState[row + 4 * col] ← sum
        RETURN newState

    METHOD addRoundKey(state, roundKey):
        FOR each index in state:
            state[index] ← state[index] XOR roundKey[index]
        RETURN state

    // Helper Functions:
    METHOD galoisMultiply(a, b):
        Perform multiplication in GF(2^8) using the AES irreducible polynomial
        RETURN result

    METHOD rotWord(word):
        RETURN word rotated left (first element becomes last)

    METHOD subWord(word):
        Substitute each byte in word using SBOX
        RETURN new word

    METHOD getWord(array, index):
        Extract 4 bytes from array starting at position index*4
        RETURN word

    METHOD setWord(array, index, word):
        Set 4 bytes in array at position index*4 with word

    METHOD xorWords(word1, word2):
        RETURN new word where each byte is word1[i] XOR word2[i]

    METHOD extractRoundKey(expandedKey, round):
        RETURN 16-byte slice of expandedKey corresponding to the round

    METHOD padAndDivideIntoBlocks(input):
        blockSize ← 16
        paddingLength ← blockSize - (length of input mod blockSize)
        paddedInput ← input appended with paddingLength repeated paddingLength bytes (PKCS#7)
        Split paddedInput into blocks of 16 bytes each
        RETURN list of blocks

    METHOD concatenateBlocks(blocks):
        Combine all blocks into a single byte array
        RETURN result

    METHOD xorBlocks(block1, block2):
        RETURN new block where each byte is block1[i] XOR block2[i]

    METHOD createState(block):
        Map the 16-byte block into a 4×4 matrix (column-major order)
        RETURN state

    METHOD addStep(stage, description, state):
        Log the step with stage, description, state details, and current timestamp
        Append this step to steps list
        
*/