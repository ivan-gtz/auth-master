"use client";

import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;
    mode?: "model" | "redirect";
    asChild?: boolean;
};

export const LoginButton = ({ children, mode = "redirect", asChild }: Props) => {

    const router = useRouter();
    if (mode === "model") {
        return (
            <span>
                TODO: Implement modal
            </span>
        )
    }

    const onClick = () => {
        router.push("/auth/login");
    }

    return (
        <span onClick={onClick} className="cursor-pointer" >
            {children}
        </span>
    )
}