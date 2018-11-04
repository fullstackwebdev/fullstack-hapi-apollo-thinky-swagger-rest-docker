import ArtistRoutes from "./Artist";
import FanRoutes from "./Fan";

export const routes = {
    name: 'API Routes',
    version: 'Pack.version',
    once: true,
    multiple: false,

    register: (server, options, next) => {
        // Declare routes
        server.route([
            ...ArtistRoutes,
            ...FanRoutes,
        ]);
    }
}

export default routes;