import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { observer } from 'mobx-react';
import Loading from '../js/Components/Loading'; // Import the Loading component

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const ObserverApp = observer(App);

        const AppWithLoading = () => (
            <>
                <Loading />
                <ObserverApp {...props} />
            </>
        );

        root.render(<AppWithLoading />);
    },
    progress: {
        color: '#4B5563',
    },
});
