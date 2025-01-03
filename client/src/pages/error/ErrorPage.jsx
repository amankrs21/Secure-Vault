import "./ErrorPage.css";

export default function ErrorPage() {

    const redirectToHome = () => {
        window.location.href = "/";
    };

    return (
        <div className="error-page">
            <h1>Oops! Something Went Wrong</h1>
            <p>We encountered an error while loading this page. Please try again.</p>
            <button onClick={redirectToHome}>Go to Home</button>
        </div>
    );
}
