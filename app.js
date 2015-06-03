import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';
import SearchStore from './stores/SearchStore';
import fetchrPlugin from 'fluxible-plugin-fetchr';

// create new fluxible instance
const app = new Fluxible({
    component: Application,
     componentActionHandler: function (context, payload, done) {
        if (payload.err) {
            if (payload.err.statusCode === 404) {
                console.log('component 404 error', payload.err);
            }
            else {
                console.log('component exception', payload.err);
            }

            return;
        }

        done();
    }
});

app.plug(fetchrPlugin({ xhrPath: '/_api' }));

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(SearchStore);

module.exports = app;
