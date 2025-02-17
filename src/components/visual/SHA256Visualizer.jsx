/*
COMPONENT SHA256Visualizer:
    STATE VARIABLES:
        input         ← string (message to hash)
        processing    ← boolean (true while hashing is in progress)
        currentStep   ← integer (tracks the current step index, if needed)
        steps         ← list (detailed steps produced during hash computation)
        showBinary    ← boolean flag to toggle display of binary representations
        expandedSteps ← dictionary mapping step indices to booleans (to manage expansion in UI)
        hashResult    ← string (final hash output)
        error         ← error message (if any)

    INITIALIZATION:
        Create an instance of the SHA256 class

    FUNCTION handleHash():
        IF input is empty:
            Set error "Please enter a message to hash"
            RETURN

        Set processing flag to true and clear any existing error

        TRY:
            result ← Call hash(input) on the SHA256 instance
            Update state:
                steps ← result.steps
                hashResult ← result.hash
                currentStep ← 0 (or reset as needed)
                Reset expandedSteps
        CATCH error:
            Set error with error message details
        FINALLY:
            Set processing flag to false

    FUNCTION toggleStepExpansion(index):
        Toggle the expanded state for the step at the given index in expandedSteps

    FUNCTION renderStateMatrix(state):
        IF state contains a matrix:
            Render the matrix as a table (each row rendered with monospaced values)
        ELSE:
            RETURN nothing

    FUNCTION renderVariables(variables):
        Render the provided variables in a grid format
        IF a value is numeric, convert it to hexadecimal format for clarity

    FUNCTION renderStepDetails(step):
        For a given step, check and render:
            - Working variables (using renderVariables)
            - Calculation details (e.g., values for S0, S1, ch, maj, temp1, temp2) in a grid
            - Binary representation if showBinary is enabled and provided in details
            - Explanations (as a list of bullet points) if available
        RETURN the detailed view for the step

    RENDER:
        Render input field for the message (input)
        Render buttons:
            - "Hash" button to trigger handleHash (show spinner if processing)
            - Button to toggle binary view (show/hide binary representation)
        IF error exists:
            Render an alert displaying the error

        IF hashResult exists:
            Render a card displaying the final hash in a monospaced style

        IF steps exist:
            Render a list of steps:
                - Each step is contained in a clickable card header that toggles expansion
                - When expanded, show detailed information rendered via renderStepDetails

        RETURN the complete component UI structure
*/