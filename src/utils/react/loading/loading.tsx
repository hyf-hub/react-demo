import { Spin } from "antd";
import { createRoot } from "react-dom/client";
import "./loading.scss";
export class Loading {
  count = 0;
  isLoading = true;
  root;
  constructor() {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.classList.add("loading");
    this.root = createRoot(div);
    this.render();
  }
  show() {
    if (!this.count) {
      this.isLoading = true;
    }
    this.count++;
  }
  close() {
    this.isLoading = false;
    this.render();
  }
  render() {
    this.root.render(
      <>
        {this.isLoading ? (
          <Spin tip="加载中..." spinning={this.isLoading}>
            <div className="h-screen w-screen bg-[#e6f4ff]"></div>
          </Spin>
        ) : null}
      </>,
    );
  }
}
