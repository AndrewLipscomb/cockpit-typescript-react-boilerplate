import * as React from "react";
import * as ReactDOM from "react-dom";

import { MyComponent } from "./MyComponent/mycomponent";

ReactDOM.render(
    <MyComponent
        compiler="TypeScript"
        framework="React" />,
    document.getElementById("root")
);
