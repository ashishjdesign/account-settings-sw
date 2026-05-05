import React from 'react';
import { Switch, Route, Router, Redirect } from "wouter";
import { Toaster } from "sonner";
import { SettingsProvider } from "./store";
import Chrome from "./components/Chrome";
import FeatureSettings from "./pages/FeatureSettings";

function App() {
  return (
    <SettingsProvider>
      <Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Toaster position="bottom-right" className="swui-scope" />
        <Chrome>
          <Switch>
            <Route path="/" component={() => <Redirect to="/feature-settings/ai" />} />
            <Route path="/feature-settings" component={() => <Redirect to="/feature-settings/ai" />} />
            <Route path="/settings/ai" component={() => <Redirect to="/feature-settings/ai" />} />
            <Route path="/settings" component={() => <Redirect to="/feature-settings/ai" />} />
            <Route path="/feature-settings/:tab">
              {params => <FeatureSettings tab={params.tab || 'ai'} />}
            </Route>
            <Route path="/:path*">
              <div className="flex h-64 items-center justify-center text-gray-500">
                <p>Coming soon</p>
              </div>
            </Route>
          </Switch>
        </Chrome>
      </Router>
    </SettingsProvider>
  );
}

export default App;
