import { Header } from "../components/Header";
import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <>
        <link rel="icon" type="image/png" href="/not-found-favicon.png" />
        <title>Page Not Found</title>
        <Header />

        <div className="not-found-page">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>       
    </>

  );
}