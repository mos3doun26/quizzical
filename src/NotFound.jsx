export default function NotFound({ resultPage }) {
    const content = resultPage ? <div>you didn't take a quiz,<br />Take one First</div> :
        <div>404, Sorry this page Not Found</div>

    return (
        <main className="not-found">
            {content}
        </main>
    )
}