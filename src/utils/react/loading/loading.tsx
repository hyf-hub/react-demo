import { Spin } from "antd";
import { createRoot } from "react-dom/client";
import "./loading.scss";
export class Loading {
  count = 0;
  isLoading = true;
  root;
  divEl = document.createElement("div");
  constructor() {
    document.body.appendChild(this.divEl);
    this.divEl.classList.add("loading");
    this.root = createRoot(this.divEl);
    this.render();
  }
  show() {
    if (!this.count) {
      this.isLoading = true;
    }
    this.count++;
  }
  close() {
    console.log("销毁");
    this.isLoading = false;
    this.root.unmount();
    document.body.removeChild(this.divEl);
    // this.render();
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
