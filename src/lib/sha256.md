/*
CLASS SHA256:
    ATTRIBUTES:
        steps ← empty list

    METHOD hash(message):
        Reset steps list
        IF message is a string:
            Convert message to byte array using text encoding
        ELSE:
            Use message as byte array

        Record step "Input Processing" with details of message bytes

        paddedMessage ← padMessage(message bytes)
        Record step "Padding" with padded message details

        hashValues ← copy of INITIAL_HASH constant
        Record step "Hash Initialization" with initial hashValues (in hexadecimal)

        FOR each 512-bit chunk in paddedMessage (process 64 bytes at a time):
            hashValues ← processChunk(chunk, hashValues)

        finalHash ← Convert hashValues to hexadecimal string
        Record step "Final Hash" with finalHash

        RETURN object with:
            hash: finalHash
            steps: recorded steps

    METHOD processChunk(chunk, hashValues):
        Initialize an array "words" of size 64
        // Convert the first 64 bytes into 16 32-bit words:
        FOR i from 0 to 15:
            words[i] ← Combine 4 bytes of chunk into a 32-bit integer

        // Extend the words array:
        FOR i from 16 to 63:
            s0 ← (rightRotate(words[i-15], 7)) XOR (rightRotate(words[i-15], 18)) XOR (words[i-15] shifted right by 3)
            s1 ← (rightRotate(words[i-2], 17)) XOR (rightRotate(words[i-2], 19)) XOR (words[i-2] shifted right by 10)
            words[i] ← (words[i-16] + s0 + words[i-7] + s1) modulo 2^32

        // Initialize working variables from current hashValues:
        (a, b, c, d, e, f, g, h) ← hashValues

        // Main compression loop:
        FOR i from 0 to 63:
            S1 ← rightRotate(e, 6) XOR rightRotate(e, 11) XOR rightRotate(e, 25)
            ch ← (e AND f) XOR ((NOT e) AND g)
            temp1 ← (h + S1 + ch + K[i] + words[i]) modulo 2^32
            S0 ← rightRotate(a, 2) XOR rightRotate(a, 13) XOR rightRotate(a, 22)
            maj ← (a AND b) XOR (a AND c) XOR (b AND c)
            temp2 ← (S0 + maj) modulo 2^32

            // Update working variables:
            h ← g
            g ← f
            f ← e
            e ← (d + temp1) modulo 2^32
            d ← c
            c ← b
            b ← a
            a ← (temp1 + temp2) modulo 2^32

            Record a step for the current round with variables and calculations

        // Update hashValues by adding working variables modulo 2^32:
        hashValues[0] ← (hashValues[0] + a) modulo 2^32
        hashValues[1] ← (hashValues[1] + b) modulo 2^32
        … (and so on for all 8 hash values)
        RETURN updated hashValues

    METHOD rightRotate(value, places):
        RETURN value rotated right by 'places' bits

    METHOD padMessage(message):
        bitLength ← number of bits in message
        Calculate padding so that (bitLength + 1 + padding + 64) is a multiple of 512
        Create paddedMessage byte array:
            Copy original message
            Append a single '1' bit (0x80) and necessary zero bytes
            Append 64-bit big-endian representation of original bitLength
        RETURN paddedMessage

    METHOD addStep(stage, description, state):
        Create a step record with stage, description, state details, and current timestamp
        Append the step record to steps list
        
 */