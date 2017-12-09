import * as React from "react";
import * as ReactDOM from "react-dom";

import { MyComponent } from "./MyComponent/mycomponent";

ReactDOM.render(
    <MyComponent
        compiler="Typescript"
        framework="React" />,
    document.getElementById("root")
);
