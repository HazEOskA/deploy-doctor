async function fix() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  if (!input) {
    output.innerText = "Wpisz error najpierw";
    return;
  }

  output.innerText = "Analyzing...";

  try {
    const res = await fetch("/api/fix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: input
      })
    });

    const data = await res.json();

    if (!res.ok) {
      output.innerText = "ERROR: " + (data.error || "API failed");
      return;
    }

    output.innerText = data.result || "Brak odpowiedzi";

  } catch (err) {
    output.innerText = "Request error: " + err.message;
  }
}
