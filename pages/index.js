import React from "react";
import App from "../layouts/App";

export default function Home() {
    return <div className="space-x-2">Tailwind CSS</div>;
}

Home.getLayout = (page) => <App children={page} />;
