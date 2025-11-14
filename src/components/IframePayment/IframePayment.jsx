import { useEffect, useRef } from 'react';

const IframePayment = ({ url = "https://chat.deepseek.com/", onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        // Adiciona o event listener quando o componente monta
        document.addEventListener('mousedown', handleClickOutside);

        // Remove o event listener quando o componente desmonta
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // fundo escuro semi-transparente
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div
                ref={modalRef}
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'white',
                    overflow: 'hidden'
                }}
            >
                <iframe
                    title="Payment Iframe"
                    src={url}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none'
                    }}
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}

export default IframePayment;