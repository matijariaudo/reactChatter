import { useEffect, useRef, useState } from "react";

const QRCodeComponent = ({ text }: { text: string }) => {
    const qrRef = useRef<HTMLDivElement>(null);
    const qrRefDark = useRef<HTMLDivElement>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
        script.onload = () => setScriptLoaded(true);
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        if (scriptLoaded && qrRef.current && window.QRCode && qrRefDark.current) {
            qrRef.current.innerHTML = ""; 
            qrRefDark.current.innerHTML = ""; 
            
            new window.QRCode(qrRef.current, {
                text: text,
                width: 220,
                height: 220,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: window.QRCode.CorrectLevel.H,
            });
            new window.QRCode(qrRefDark.current, {
                text: text,
                width: 220,
                height: 220,
                colorDark: "#FFFFFF",
                colorLight: "#171F2F",
                correctLevel: window.QRCode.CorrectLevel.H,
            });
        }
    }, [scriptLoaded, text]);

    return (
        <>
            {/* QR para modo claro */}
            <div
                ref={qrRef}
                className="flex dark:hidden"
                style={{
                    alignItems: "center",
                    width: "220px",
                    height: "220px",
                    background: "transparent",
                    overflow: "hidden",
                    padding: "0",
                }}
            />
            {/* QR para modo oscuro */}
            <div
                ref={qrRefDark}
                className="hidden dark:flex"
                style={{
                    alignItems: "center",
                    width: "220px",
                    height: "220px",
                    background: "transparent",
                    overflow: "hidden",
                    padding: "0",
                }}
            />
        </>
    );
};

export default QRCodeComponent;
