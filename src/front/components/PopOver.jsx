import React, { useEffect, useRef } from "react";

export const PopOver = ({ title, content, children })=> {

    // To prevent multiple popover initializations
    const ref = useRef(null);

    useEffect(() => {
        const popover = new bootstrap.Popover(ref.current, {
        trigger: "hover",
        html: true,
        content: content || "",
        placement: "bottom",
        customClass: "popover_body lh-sm"
        });

        return () => popover.dispose();
    }, [content]);

    // Attach ref and data attribute to child button
    return (
        <>
            {React.cloneElement(children, {
                ref,
                "data-bs-toggle": "popover",
            })}
        </>
    );
}