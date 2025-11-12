import { useEffect } from "react";

export default function RedirectToPix() {

  let url = "src/Payment/pix-payment.php";

  useEffect(() => {
    window.location.href = url; // Redireciona para o PHP
  }, [url]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Redirecionando...</h2>
    </div>
  );
}
