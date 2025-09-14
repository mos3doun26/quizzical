import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="home">
            <h1>Quizzical</h1>
            <p>Check your knowladge with random and quick exam...</p>
            <Link to="/quiz"><button className="btn start-btn">Start quiz</button></Link>
        </main>
    )
}