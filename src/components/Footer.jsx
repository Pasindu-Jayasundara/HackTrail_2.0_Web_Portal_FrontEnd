export default function Footer() {
    return (
        <footer className="shadow-sm w-full">
            <div className="bg-gray-800 w-full mx-auto p-6 text-center space-y-2">
                <p className="text-sm text-gray-400">
                    <span className="font-medium text-gray-300">For Inquiries:</span>
                </p>

                <p className="text-sm text-gray-400">
                    WhatsApp:{" "}
                    <a
                        href="https://wa.me/94786268640"
                        className="hover:underline text-blue-400"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        078 626 8640
                    </a>
                </p>

                <p className="text-sm text-gray-400">
                    Email:{" "}
                    <a
                        href="mailto:chirathwijesinghe123@gmail.com"
                        className="hover:underline text-blue-400"
                    >
                        chirathwijesinghe123@gmail.com
                    </a>
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
                    © 2025{" "}
                    <a href="#" className="hover:underline">
                        ICTSC™
                    </a>. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
