import React, { useState } from "react";
import "antd/dist/antd.css";
import { render } from "react-dom";
import Login from "./login";
import { Button, Modal } from "antd";
import withLoadingProvider from "./hoc/withLoadingProvider";
import withSpinConsumer from "./hoc/withSpinConsumer";
import withCancelActionConsumer from "./hoc/withCancelActionConsumer.tsx";

import "./styles.css";

const ModalWithLoading = withLoadingProvider()(
  withCancelActionConsumer()(Modal)
);

const LoginWithSpin = withSpinConsumer()(Login);

const Login2 = withLoadingProvider()(
  withCancelActionConsumer()(({ onCancel, ...props }) => (
    <div>
      <LoginWithSpin {...props} />
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  ))
);

function App() {
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  return (
    <div className="App">
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Login
      </Button>
      <ModalWithLoading visible={visible} onOk={hideModal} onCancel={hideModal}>
        <LoginWithSpin />
      </ModalWithLoading>
      <Login2 />
      <Login2 />
      <Login2 />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
