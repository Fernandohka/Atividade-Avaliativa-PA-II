/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{protocol: "https", hostname: "dragonball-api.com"}]
    },
    
    rewrites: () => {
        return [
            {
                source: "/",
                destination: "/home",
            },
            {
                source: "/Primeira-Pagina",
                destination: "/primeira-rota",
            },
            {
                source: "/Segunda-Pagina",
                destination: "/segunda-rota",
            },
            {
                source: "/Terceira-Pagina",
                destination: "/terceira-rota",
            },
        ]
    }
};

export default nextConfig;
