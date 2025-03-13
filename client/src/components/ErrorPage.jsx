// Error page component
export default function ErrorPage() {
    const redirectToHome = () => {
        window.location.href = "/";
    };

    const styles = {
        errorPage: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
        },
        heading: {
            fontSize: "2.5rem",
            color: "#dc3545",
        },
        paragraph: {
            margin: "1rem 0",
            fontSize: "1.2rem",
            color: "#6c757d",
        },
        button: {
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
    };

    return (
        <div style={styles.errorPage}>
            <h1 style={styles.heading}>Oops! Something Went Wrong</h1>
            <p style={styles.paragraph}>
                We encountered an error while loading this page. Please try again.
            </p>
            <button
                style={styles.button}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                onClick={redirectToHome}
            >
                Go to Home
            </button>
        </div>
    );
}
