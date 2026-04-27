async function fix() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  output.innerText = "Analyzing...";

  const res = await fetch("/api/fix", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input })
  });

  const data = await res.json();
  output.innerText = data.result;
}
