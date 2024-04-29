import type { Metadata } from "next";
import React from "react";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-spaceGrotesk",
});
export const metadata: Metadata = {
    title: "DevOverflow",
    description:
        "DevOverflow is the ultimate community-driven platform tailored for developers. Whether you're tackling bugs, exploring new technologies, or enhancing your coding skills, DevOverflow provides a dynamic space to ask questions, share knowledge, and connect with other tech enthusiasts. Our platform fosters a supportive environment where both novice and experienced developers can find detailed answers, participate in discussions, and contribute to a growing repository of programming wisdom. Join DevOverflow today and be part of a thriving network that propels your coding journey forward!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
                <ClerkProvider
                    appearance={{
                        elements: {
                            formButtonPrimary: "primary-gradient",
                            footerActionLink:
                                "primary-text-gradient hover:text-primary-500",
                        },
                    }}
                >
                    <ThemeProvider>{children}</ThemeProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
