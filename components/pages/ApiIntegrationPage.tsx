export default function ApiIntegrationPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">API Integration</h1>
            <p className="mb-2 text-center max-w-lg">
                Integrate your application with our QR code API to generate and manage QR codes programmatically.
            </p>
            <a
                href="https://your-api-docs-link.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
            >
                View API Documentation
            </a>
        </div>
    );
}


