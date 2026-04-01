document.addEventListener("DOMContentLoaded", () => {
  const extractBtn = document.getElementById("extractBtn");
  const copyBtn = document.getElementById("copyBtn");
  const stateOutput = document.getElementById("stateOutput");
  const statusDiv = document.getElementById("status");

  function setLoading(isLoading) {
    extractBtn.disabled = isLoading;
    extractBtn.textContent = isLoading ? "正在提取，请稍候..." : "提取登录态 JSON";
  }

  function updateStatus(message, isSuccess = false) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${isSuccess ? "success" : "error"}`;
    setTimeout(() => {
      statusDiv.textContent = "";
      statusDiv.className = "status";
    }, 4000);
  }

  function renderSnapshot(snapshot) {
    stateOutput.value = JSON.stringify(snapshot, null, 2);
  }

  function captureSnapshot() {
    setLoading(true);
    updateStatus("正在采集 Cookie、请求头和浏览器环境...");
    stateOutput.value = "";

    chrome.runtime.sendMessage({ type: "captureSnapshot" }, (response) => {
      setLoading(false);

      if (chrome.runtime.lastError) {
        updateStatus(`通信失败: ${chrome.runtime.lastError.message}`);
        return;
      }

      if (!response || !response.ok) {
        updateStatus(`提取失败: ${response?.error || "未知错误"}`);
        return;
      }

      renderSnapshot(response.data);
      updateStatus("提取完成，可以复制或保存 JSON。", true);
    });
  }

  function copySnapshot() {
    if (!stateOutput.value) {
      updateStatus("没有可复制的数据");
      return;
    }

    navigator.clipboard.writeText(stateOutput.value)
      .then(() => updateStatus("已复制到剪贴板", true))
      .catch((err) => updateStatus(`复制失败: ${err}`));
  }

  extractBtn.addEventListener("click", captureSnapshot);
  copyBtn.addEventListener("click", copySnapshot);
});
