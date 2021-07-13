let tab = null;

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("started");
  chrome.tabs.getSelected(null, function (_tab) {
    tab = _tab;
    const tabId = tab.id;
    chrome.tabs.sendMessage(
      tab.id,
      { msg: "alive", tabId: tab.id },
      async function (res) {
        if (res) {
          console.log(JSON.stringify(res));

          document.getElementById("alive").innerText = res.alive;
          document.getElementById("starttime").innerText = res.starttime;
        } else {
          document.getElementById("co").innerText = "(0)";
          document.getElementById("alive").innerText = "(0)";
        }
        return true;
      }
    );
  });

  const download = document.getElementById("download");
  const closee = document.getElementById("closee");

  closee.addEventListener("click", function () {
    window.close();
  });

  document.getElementById("body").addEventListener("mouseenter", () => {
    chrome.tabs.sendMessage(
      tab.id,
      { msg: "alive", tabId: tab.id },
      function (res) {
        if (res) {
          console.log(res);

          document.getElementById("alive").innerText = res.alive;
        } else {
          document.getElementById("alive").innerText = "(0)";
        }
        return true;
      }
    );
  });

  download.addEventListener("click", () => {
    chrome.tabs.sendMessage(
      tab.id,
      { msg: "download", tabId: tab.id },
      function (res) {
        return true;
      }
    );
  });
});
