/*
COMPONENT AESVisualizer:
    STATE VARIABLES:
        input       ← string (message to encrypt)
        key         ← string (16-character encryption key)
        iv          ← string (initialization vector; used if mode is CBC)
        mode        ← string ("ECB" by default, can be "CBC")
        processing  ← boolean flag to indicate if encryption is in progress
        steps       ← list to store encryption steps (detailed process)
        showBinary  ← boolean flag to toggle binary view in steps
        expandedSteps ← dictionary mapping step groups or indices to booleans (to expand/collapse details)
        encryptionResult ← final ciphertext result
        error       ← error message (if any)
        showKey     ← boolean flag to toggle display of key text

    FUNCTION handleEncrypt():
        IF input OR key is empty:
            Set error message "Please enter both message and key"
            RETURN

        IF key length ≠ 16:
            Set error message indicating incorrect key length and return

        IF mode is "CBC" AND (iv is missing OR iv length ≠ 16):
            Set error message "CBC mode requires a 16-character initialization vector"
            RETURN

        Set processing flag to true and clear any existing error

        TRY:
            Create an instance of AES128
            result ← Call encrypt(input, key, mode, iv) on AES128 instance
            Update state:
                steps ← result.steps
                encryptionResult ← result.ciphertext
                Reset expandedSteps for UI
        CATCH error:
            Set error message with error details
        FINALLY:
            Set processing flag to false

    FUNCTION toggleStepExpansion(index):
        Toggle the expansion state for the given step index in expandedSteps

    FUNCTION renderStateMatrix(matrix):
        IF matrix is valid:
            Render the matrix as a table (rows and columns with each cell showing hexadecimal values)
        ELSE:
            RETURN nothing

    FUNCTION renderStepDetails(step):
        For a given step, check:
            IF step includes a stateMatrix, render it using renderStateMatrix
            IF showBinary is enabled and binary view details exist, render those details
            IF transformations are included, render them in a grid layout
            IF additional explanations are provided, render them as a list
        RETURN the rendered step details

    RENDER:
        Render input fields:
            - Text input for the message (input)
            - Password/text input for the key (with a toggle to show/hide)
            - Dropdown (select) for mode ("ECB" or "CBC")
            - IF mode is "CBC", render an input for IV

        Render action buttons:
            - Encrypt button (disabled if processing)
            - Toggle button for binary view

        IF error exists:
            Render an alert displaying the error message

        IF encryptionResult exists:
            Render a card showing the final ciphertext in a monospaced font

        IF steps exist:
            Render a section summarizing:
                - Input values (plain text, key, and IV if applicable)
                - Final cipher text
                - Encryption process broken into groups (e.g., Initial Round, Main Rounds, Final Round)
                    • Each group can be expanded/collapsed to show detailed step explanations

        RETURN the complete component UI structure
*/