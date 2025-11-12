import { useEffect } from "react";

export default function RedirectToCard() {

    let url = "src/Payment/card-payment.php";

    useEffect(() => {
        window.location.href = url; // Redireciona para o PHP
    }, [url]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Redirecionando...</h2>
        </div>
    );
}
