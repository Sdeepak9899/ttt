// "use client";

// import { useEffect } from "react";
// import { useAuthStore } from "@/lib/store/authStore";

// export default function Providers({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     const me = useAuthStore((s) => s.me);

//     useEffect(() => {
//         me();
//     }, []);

//     return <>{children}</>;
// }



"use client";

import { ThemeProvider } from "@/lib/theme-context";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export default function Providers({ children }: { children: React.ReactNode }) {
    const me = useAuthStore((s) => s.me);

    useEffect(() => {
        me();
    }, [me]);

    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}