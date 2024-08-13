import './App.css'
import "react-markdown-editor-lite/lib/index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {routes} from "./router/routes.tsx";
import {PipelineProvider} from "./stores/usePipelineContext.tsx";
import {DefaultPromptsProvider} from "./stores/useDefaultPrompts.tsx";
const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL });

function App() {

    return (
        <DefaultPromptsProvider>
            <PipelineProvider>
                <RouterProvider router={router} />
            </PipelineProvider>
        </DefaultPromptsProvider>

    )
}

export default App
