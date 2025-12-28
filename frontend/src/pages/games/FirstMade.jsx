import { useState, useEffect } from "react";

const HEART_COUNT = 30;
function FirstMade() {
    const [hearts, setHearts] = useState([]);
    const [caught, setCaught] = useState(0);
    const [message, setMessage] = useState("");

    // Initialize hearts
    useEffect(() => {
        const initialHearts = Array.from({ length: HEART_COUNT }, (_, i) => ({
            id: i,
            x: Math.random() * (window.innerWidth - 60),
            y: Math.random() * (window.innerHeight - 60),
            dx: (Math.random() - 0.5) * 3,
            dy: (Math.random() - 0.5) * 3,
            caught: false,
        }));
        setHearts(initialHearts);
    }, []);

    // Movement loop
    useEffect(() => {
        const interval = setInterval(() => {
            setHearts((prev) =>
                prev.map((heart) => {
                    if (heart.caught) return heart;

                    let { x, y, dx, dy } = heart;

                    x += dx;
                    y += dy;

                    if (x <= 0 || x >= window.innerWidth - 50) dx *= -1;
                    if (y <= 0 || y >= window.innerHeight - 50) dy *= -1;

                    return { ...heart, x, y, dx, dy };
                })
            );
        }, 16);

        return () => clearInterval(interval);
    }, []);

    // Message logic
    useEffect(() => {
        switch (caught) {
            case 6:
                setMessage("Good start!");
                break;
            case 12:
                setMessage("That is cool that you hit that much number of hearts");
                break;
            case 18:
                setMessage("I think you can stop on that");
                break;
            case 24:
                setMessage("Outch that hurts a little bit");
                break;
            case 30:
                setMessage(
                    "Ok, ok please stop. Can you please check out the pizza instead of hitting me"
                );
                break;
            default:
                break;
        }
    }, [caught]);

    const catchHeart = (id) => {
        setHearts((prev) =>
            prev.map((h) =>
                h.id === id ? { ...h, caught: true } : h
            )
        );
        setCaught((c) => c + 1);
    };
    return (
        <div style={styles.container}>
            <div style={styles.ui}>
                <h1>Welcome to Rela! 💖</h1>
                <p>Catch all flying hearts!</p>
                <p>
                    {caught} / {HEART_COUNT}
                </p>

                {message && <p style={styles.message}>{message}</p>}
            </div>

            {hearts.map(
                (heart) =>
                    !heart.caught && (
                        <div
                            key={heart.id}
                            onClick={() => catchHeart(heart.id)}
                            style={{
                                ...styles.heart,
                                left: heart.x,
                                top: heart.y,
                            }}
                        >
                            ❤️
                        </div>
                    )
            )}
        </div>
    );
}
const styles = {
    container: {
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#ffe6ec",
    },
    ui: {
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        zIndex: 10,
        background: "rgba(255,255,255,0.9)",
        padding: "12px 20px",
        borderRadius: "12px",
    },
    message: {
        marginTop: "8px",
        fontWeight: "bold",
        color: "#d1004c",
    },
    heart: {
        position: "absolute",
        fontSize: "36px",
        cursor: "pointer",
        userSelect: "none",
    },
};
export default FirstMade;