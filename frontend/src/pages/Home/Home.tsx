type Props = {
    health: string
}

export default function Home({ health }: Props) {
    return (
        <div>
            <h1>home</h1>
            <p>Backend: {health}</p>
        </div>
    )
}