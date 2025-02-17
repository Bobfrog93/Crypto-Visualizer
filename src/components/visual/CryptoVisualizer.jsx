/*
COMPONENT CryptoVisualizer:
    STATE VARIABLES:
        activeTab ← string ("sha256" or "aes"; defaults to one tab)
        theme     ← string ("light" or "dark"; for theme toggling)

    FUNCTION handleTabChange(value):
        Update activeTab to the selected value

    RENDER:
        Render a container with appropriate padding and background styling (depending on theme)

        Within a Card component:
            Render Card Header:
                - Title "Cryptography Visualization Tool"
                - Subtitle "Interactive visualization of encryption and hashing algorithms"
                - Button to toggle theme (light/dark mode)

            Render Card Content:
                - Render Tabs component with two tabs:
                    • Tab 1: "SHA-256 Hash Function" (value "sha256")
                    • Tab 2: "AES-128 Encryption" (value "aes")
                - Based on activeTab:
                    • IF activeTab is "sha256", render the SHA256Visualizer component, passing the theme as a prop
                    • IF activeTab is "aes", render the AESVisualizer component, passing the theme as a prop

            Render an "About" section below the tabs explaining:
                - The purpose of the visualization tool
                - Brief details on both AES encryption and SHA-256 hashing

        RETURN the complete component UI structure
*/